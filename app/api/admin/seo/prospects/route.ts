import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { computeProspectScore } from "@/lib/seo/scoring";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  try {
    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (status && status !== "ALL") {
      where.outreachStatus = status;
    }
    if (search) {
      where.OR = [
        { domain: { contains: search } },
        { title: { contains: search } },
        { notes: { contains: search } },
      ];
    }

    const prospects = await prisma.seoProspect.findMany({
      where,
      orderBy: { priorityScore: "desc" },
      include: {
        pitches: {
          select: { id: true, angleType: true, status: true, sentAt: true },
        },
      },
    });

    return NextResponse.json({ success: true, prospects });
  } catch (error: unknown) {
    console.error("Prospects GET error:", error);
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      domain,
      pageUrl,
      title,
      category,
      editorialGuidelines,
      topicalRelevance = 15,
      editorialCredibility = 10,
      audiencePotential = 8,
      indianRelevance = 5,
      editorialOpportunity = 8,
      websiteQuality = 5,
      contactName,
      contactEmail,
      contactUrl,
      estimatedEffort = "Medium",
      notes,
      targetLandingPage = "/services/loan-settlement",
    } = body;

    if (!domain || !pageUrl || !title || !category) {
      return NextResponse.json({ error: "Domain, Page URL, Title, and Category are required" }, { status: 400 });
    }

    // Compute transparent internal score & check spam flags
    const scoreResult = computeProspectScore(
      {
        topicalRelevance: Number(topicalRelevance),
        editorialCredibility: Number(editorialCredibility),
        audiencePotential: Number(audiencePotential),
        indianRelevance: Number(indianRelevance),
        editorialOpportunity: Number(editorialOpportunity),
        websiteQuality: Number(websiteQuality),
      },
      `${domain} ${notes || ""} ${editorialGuidelines || ""}`
    );

    const riskIndicators = scoreResult.spamFlags.length > 0 ? scoreResult.spamFlags.join(", ") : "CLEAN";

    const prospect = await prisma.seoProspect.create({
      data: {
        domain: domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase(),
        pageUrl,
        title,
        category,
        editorialGuidelines,
        topicalRelevance: Number(topicalRelevance),
        editorialCredibility: Number(editorialCredibility),
        audiencePotential: Number(audiencePotential),
        indianRelevance: Number(indianRelevance),
        editorialOpportunity: Number(editorialOpportunity),
        websiteQuality: Number(websiteQuality),
        priorityScore: scoreResult.totalScore,
        contactName,
        contactEmail,
        contactUrl,
        estimatedEffort,
        riskIndicators,
        outreachStatus: scoreResult.spamFlags.length > 0 ? "SUPPRESSED" : "DISCOVERED",
        notes,
        targetLandingPage,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "CREATE_SEO_PROSPECT",
        entityType: "SeoProspect",
        entityId: prospect.id,
        details: `Created prospect ${prospect.domain} (Score: ${scoreResult.totalScore})`,
      },
    });

    return NextResponse.json({ success: true, prospect, scoreResult });
  } catch (error: unknown) {
    console.error("Prospect POST error:", error);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, outreachStatus, notes, targetLandingPage } = body;

    if (!id) {
      return NextResponse.json({ error: "Prospect ID is required" }, { status: 400 });
    }

    const updated = await prisma.seoProspect.update({
      where: { id },
      data: {
        ...(outreachStatus ? { outreachStatus } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(targetLandingPage ? { targetLandingPage } : {}),
      },
    });

    return NextResponse.json({ success: true, prospect: updated });
  } catch (error: unknown) {
    console.error("Prospect PUT error:", error);
    return NextResponse.json({ error: "Failed to update prospect" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.seoProspect.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Prospect DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}
