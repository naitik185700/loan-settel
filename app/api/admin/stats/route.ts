import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalLeads,
      newLeads,
      contactedLeads,
      inProgressLeads,
      convertedLeads,
      recentLeads,
      totalPosts,
      totalFaqs,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "CONTACTED" } }),
      prisma.lead.count({ where: { status: "IN_PROGRESS" } }),
      prisma.lead.count({ where: { status: "CONVERTED" } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blogPost.count(),
      prisma.fAQ.count(),
    ]);

    // Breakdown by loan category
    const categoryCounts = await prisma.lead.groupBy({
      by: ["loanCategory"],
      _count: { id: true },
    });

    return NextResponse.json({
      metrics: {
        totalLeads,
        newLeads,
        contactedLeads,
        inProgressLeads,
        convertedLeads,
        totalPosts,
        totalFaqs,
      },
      categoryCounts,
      recentLeads,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
