import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadFormSchema, quickCallbackSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP (max 10 submissions per 10 minutes per IP)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limiter = rateLimit(`lead_${ip}`, 10, 10 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error:
            "Too many requests from this address. Please wait a few minutes before submitting another enquiry.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Validate input
    let parsedData: any;
    if (body.source === "callback_modal") {
      parsedData = quickCallbackSchema.parse(body);
    } else {
      parsedData = leadFormSchema.parse(body);
    }

    // 3. Prevent duplicate submissions within last 15 minutes with exact same phone & loan type
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const existing = await prisma.lead.findFirst({
      where: {
        mobile: parsedData.mobile,
        loanCategory: parsedData.loanCategory,
        createdAt: { gte: fifteenMinutesAgo },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message:
          "Your enquiry has already been received. Our advisory team will contact you shortly during business hours.",
        leadId: existing.id,
      });
    }

    // 4. Save to Database
    const userAgent = req.headers.get("user-agent") || undefined;
    const lead = await prisma.lead.create({
      data: {
        fullName: parsedData.fullName,
        mobile: parsedData.mobile,
        email: parsedData.email || null,
        loanCategory: parsedData.loanCategory,
        outstandingAmount: parsedData.outstandingAmount || null,
        preferredTime: parsedData.preferredTime || null,
        description: parsedData.description || null,
        source: parsedData.source || "website_form",
        consentGiven: parsedData.consentGiven,
        ipAddress: ip.split(",")[0].trim(),
        userAgent: userAgent ? userAgent.substring(0, 200) : null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Settle Loan Expert. Your enquiry has been securely registered. A senior debt resolution consultant will review your details and reach out.",
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.errors.map((e: any) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your enquiry. Please call us directly." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Secured admin endpoint
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const status = searchParams.get("status") || undefined;
    const paymentStatus = searchParams.get("paymentStatus") || undefined;
    const search = searchParams.get("search") || undefined;

    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status && status !== "ALL") {
      whereClause.status = status;
    }
    if (paymentStatus && paymentStatus !== "ALL") {
      whereClause.paymentStatus = paymentStatus;
    }
    if (search) {
      whereClause.OR = [
        { fullName: { contains: search } },
        { mobile: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where: whereClause,
        include: {
          notes: {
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
