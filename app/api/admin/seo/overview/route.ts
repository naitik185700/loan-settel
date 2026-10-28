import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalProspects,
      qualifiedProspects,
      approvedPitches,
      sentPitches,
      liveBacklinks,
      monitoredBacklinks,
      disavowedLinks,
      liveDirectories,
      totalDirectories,
      competitorGaps,
      auditIssues,
      gscAggregate,
      analyticsAggregate,
    ] = await Promise.all([
      prisma.seoProspect.count(),
      prisma.seoProspect.count({ where: { priorityScore: { gte: 70 } } }),
      prisma.outreachPitch.count({ where: { status: "APPROVED" } }),
      prisma.outreachPitch.count({ where: { status: "SENT" } }),
      prisma.monitoredBacklink.count({ where: { isLive: true } }),
      prisma.monitoredBacklink.count(),
      prisma.monitoredBacklink.count({ where: { isDisavowed: true } }),
      prisma.directoryListing.count({ where: { status: "LIVE" } }),
      prisma.directoryListing.count(),
      prisma.competitorBacklink.count({ where: { gapStatus: { in: ["UNEXPLORED", "QUALIFIED_PROSPECT"] } } }),
      prisma.seoAuditFinding.count({ where: { isResolved: false } }),
      prisma.searchConsoleData.aggregate({
        _sum: { clicks: true, impressions: true },
        _avg: { position: true, ctr: true },
      }),
      prisma.analyticsData.aggregate({
        _sum: { sessions: true, enquiryLeads: true },
      }),
    ]);

    const lostLinks = await prisma.monitoredBacklink.count({
      where: { isLive: false, isDisavowed: false },
    });

    return NextResponse.json({
      success: true,
      data: {
        prospects: {
          total: totalProspects,
          qualified: qualifiedProspects,
        },
        outreach: {
          approvedPitches,
          sentPitches,
        },
        backlinks: {
          live: liveBacklinks,
          total: monitoredBacklinks,
          lost: lostLinks,
          disavowed: disavowedLinks,
        },
        directories: {
          live: liveDirectories,
          total: totalDirectories,
        },
        competitors: {
          openGaps: competitorGaps,
        },
        technicalAudit: {
          unresolvedIssues: auditIssues,
        },
        searchPerformance: {
          totalClicks: gscAggregate._sum.clicks || 0,
          totalImpressions: gscAggregate._sum.impressions || 0,
          avgPosition: Number((gscAggregate._avg.position || 0).toFixed(1)),
          avgCtr: Number((gscAggregate._avg.ctr || 0).toFixed(2)),
          organicLeads: analyticsAggregate._sum.enquiryLeads || 0,
          totalSessions: analyticsAggregate._sum.sessions || 0,
          isEstimated: true,
        },
      },
    });
  } catch (error: unknown) {
    console.error("SEO Overview error:", error);
    return NextResponse.json({ error: "Failed to load SEO overview metrics" }, { status: 500 });
  }
}
