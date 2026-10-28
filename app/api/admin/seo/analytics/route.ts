import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [searchConsoleQueries, analyticsChannels] = await Promise.all([
      prisma.searchConsoleData.findMany({
        orderBy: { clicks: "desc" },
        take: 50,
      }),
      prisma.analyticsData.findMany({
        orderBy: { date: "desc" },
        take: 30,
      }),
    ]);

    return NextResponse.json({
      success: true,
      queries: searchConsoleQueries,
      channels: analyticsChannels,
    });
  } catch (error: unknown) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // Action 1: Add or Update GSC Query Metric
    if (action === "add-query") {
      const { query, clicks = 0, impressions = 0, position = 10.0, page } = body;
      if (!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
      }

      const ctr = impressions > 0 ? Number(((clicks / impressions) * 100).toFixed(2)) : 0.0;

      const created = await prisma.searchConsoleData.create({
        data: {
          date: new Date(),
          query,
          page: page || "https://settleloanexpert.in/services/loan-settlement",
          clicks: Number(clicks),
          impressions: Number(impressions),
          ctr,
          position: Number(position),
          isEstimated: false, // Explicitly verified input
        },
      });

      return NextResponse.json({ success: true, entry: created });
    }

    // Action 2: Add Analytics Channel Snapshot
    if (action === "add-channel") {
      const { channel, sessions = 0, users = 0, enquiryLeads = 0, bounceRate = 0 } = body;
      if (!channel) {
        return NextResponse.json({ error: "Channel is required" }, { status: 400 });
      }

      const created = await prisma.analyticsData.create({
        data: {
          date: new Date(),
          channel,
          sessions: Number(sessions),
          users: Number(users),
          enquiryLeads: Number(enquiryLeads),
          bounceRate: Number(bounceRate),
          isEstimated: false,
        },
      });

      return NextResponse.json({ success: true, entry: created });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Analytics POST error:", error);
    return NextResponse.json({ error: "Failed to record analytics" }, { status: 500 });
  }
}
