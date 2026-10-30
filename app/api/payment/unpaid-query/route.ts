import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      leadId,
      fullName = "Zoho Consultation Applicant",
      mobile = "",
      email = null,
      loanCategory = "Personal Loan",
      outstandingAmount = null,
      reason = "User skipped payment or payment was not completed",
      source = "zoho_form",
    } = body;

    let lead: any = null;

    if (leadId) {
      lead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          paymentStatus: "UNPAID",
          status: "NEW", // Saved as active standard consultation query in queue
          source: source || "zoho_form",
          notes: {
            create: {
              authorName: "System",
              content: `Data collected via Zoho Form. ${reason}. Standard free evaluation query generated.`,
            },
          },
        },
      });
    } else {
      // Find recent lead by mobile or create a new query
      if (mobile) {
        lead = await prisma.lead.findFirst({
          where: {
            mobile,
            createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
          },
          orderBy: { createdAt: "desc" },
        });
      }

      if (!lead) {
        lead = await prisma.lead.create({
          data: {
            fullName: fullName || "Zoho Consultation Applicant",
            mobile: mobile || "Collected via Zoho",
            email: email || null,
            loanCategory: loanCategory || "Personal Loan",
            outstandingAmount: outstandingAmount || null,
            status: "NEW",
            paymentStatus: "UNPAID",
            source: source || "zoho_form",
            notes: {
              create: {
                authorName: "Zoho Integration",
                content: `Initial data collected via Zoho Form. Free standard consultation query logged in CRM.`,
              },
            },
          },
        });
      } else {
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: {
            paymentStatus: "UNPAID",
            status: "NEW",
            source: source || "zoho_form",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Consultation query successfully collected and logged.",
      leadId: lead?.id,
      paymentStatus: "UNPAID",
    });
  } catch (error: any) {
    console.error("Unpaid Query Handler Error:", error);
    return NextResponse.json(
      { error: "Failed to record consultation query", details: error?.message },
      { status: 500 }
    );
  }
}
