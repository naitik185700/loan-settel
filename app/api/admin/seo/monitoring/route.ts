import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { checkBacklinkLive } from "@/lib/seo/crawler";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const backlinks = await prisma.monitoredBacklink.findMany({
      include: {
        prospect: {
          select: { title: true, domain: true, category: true },
        },
        checkLogs: {
          take: 5,
          orderBy: { checkedAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, backlinks });
  } catch (error: unknown) {
    console.error("Monitoring GET error:", error);
    return NextResponse.json({ error: "Failed to fetch monitored links" }, { status: 500 });
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

    // Action 1: Add new monitored backlink
    if (action === "add") {
      const { referringUrl, targetUrl = "https://settleloanexpert.in", prospectId, anchorText, relAttribute = "follow" } = body;
      if (!referringUrl) {
        return NextResponse.json({ error: "Referring URL is required" }, { status: 400 });
      }

      // Live verification test on insertion
      const crawlResult = await checkBacklinkLive(referringUrl, targetUrl);

      const created = await prisma.monitoredBacklink.create({
        data: {
          referringUrl,
          targetUrl,
          prospectId: prospectId || null,
          anchorText: crawlResult.anchorText || anchorText || "[Not Verified]",
          relAttribute: crawlResult.relAttribute || relAttribute,
          httpStatus: crawlResult.httpStatus || 200,
          isLive: crawlResult.isFound,
          lastCheckedAt: new Date(),
          checkLogs: {
            create: {
              httpStatus: crawlResult.httpStatus,
              anchorFound: crawlResult.anchorText,
              relFound: crawlResult.relAttribute,
              isFound: crawlResult.isFound,
              responseTimeMs: crawlResult.responseTimeMs,
              rawDetails: crawlResult.error || "Initial check on addition",
            },
          },
        },
      });

      return NextResponse.json({ success: true, backlink: created, crawlResult });
    }

    // Action 2: Check single backlink now
    if (action === "check-now") {
      const { id } = body;
      const backlink = await prisma.monitoredBacklink.findUnique({ where: { id } });
      if (!backlink) {
        return NextResponse.json({ error: "Backlink not found" }, { status: 404 });
      }

      const crawlResult = await checkBacklinkLive(backlink.referringUrl, backlink.targetUrl);

      const updated = await prisma.monitoredBacklink.update({
        where: { id },
        data: {
          httpStatus: crawlResult.httpStatus,
          isLive: crawlResult.isFound,
          anchorText: crawlResult.anchorText || backlink.anchorText,
          relAttribute: crawlResult.relAttribute || backlink.relAttribute,
          lastCheckedAt: new Date(),
          errorCount: crawlResult.isFound ? 0 : backlink.errorCount + 1,
        },
      });

      await prisma.backlinkCheckLog.create({
        data: {
          backlinkId: id,
          httpStatus: crawlResult.httpStatus,
          anchorFound: crawlResult.anchorText,
          relFound: crawlResult.relAttribute,
          isFound: crawlResult.isFound,
          responseTimeMs: crawlResult.responseTimeMs,
          rawDetails: crawlResult.error || "Manual check verified",
        },
      });

      return NextResponse.json({ success: true, backlink: updated, crawlResult });
    }

    // Action 3: Check all active monitored links in sequence (with courteous spacing)
    if (action === "check-all") {
      const allLinks = await prisma.monitoredBacklink.findMany({
        where: { isDisavowed: false },
        take: 20, // Polite batch limit
      });

      let checkedCount = 0;
      let liveCount = 0;

      for (const link of allLinks) {
        const crawlResult = await checkBacklinkLive(link.referringUrl, link.targetUrl);
        await prisma.monitoredBacklink.update({
          where: { id: link.id },
          data: {
            httpStatus: crawlResult.httpStatus,
            isLive: crawlResult.isFound,
            anchorText: crawlResult.anchorText || link.anchorText,
            relAttribute: crawlResult.relAttribute || link.relAttribute,
            lastCheckedAt: new Date(),
            errorCount: crawlResult.isFound ? 0 : link.errorCount + 1,
          },
        });

        await prisma.backlinkCheckLog.create({
          data: {
            backlinkId: link.id,
            httpStatus: crawlResult.httpStatus,
            anchorFound: crawlResult.anchorText,
            relFound: crawlResult.relAttribute,
            isFound: crawlResult.isFound,
            responseTimeMs: crawlResult.responseTimeMs,
            rawDetails: crawlResult.error || "Automated batch crawl completed",
          },
        });

        checkedCount++;
        if (crawlResult.isFound) liveCount++;
      }

      return NextResponse.json({ success: true, checkedCount, liveCount });
    }

    // Action 4: Toggle Disavow / Toxicity
    if (action === "toggle-disavow") {
      const { id, isDisavowed, toxicityReason, toxicityScore = 80 } = body;
      const updated = await prisma.monitoredBacklink.update({
        where: { id },
        data: {
          isDisavowed: Boolean(isDisavowed),
          toxicityReason: toxicityReason || null,
          toxicityScore: isDisavowed ? Number(toxicityScore) : 0,
        },
      });

      return NextResponse.json({ success: true, backlink: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Monitoring POST error:", error);
    return NextResponse.json({ error: "Failed to process monitoring action" }, { status: 500 });
  }
}
