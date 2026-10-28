import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const competitors = await prisma.competitorDomain.findMany({
      include: {
        backlinks: true,
      },
      orderBy: { domain: "asc" },
    });

    return NextResponse.json({ success: true, competitors });
  } catch (error: unknown) {
    console.error("Competitors GET error:", error);
    return NextResponse.json({ error: "Failed to fetch competitors" }, { status: 500 });
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

    // Action 1: Add Competitor Domain
    if (action === "add-domain") {
      const { domain, companyName, marketFocus, notes } = body;
      if (!domain || !companyName) {
        return NextResponse.json({ error: "Domain and company name required" }, { status: 400 });
      }

      const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();

      const created = await prisma.competitorDomain.create({
        data: {
          domain: cleanDomain,
          companyName,
          marketFocus,
          notes,
        },
      });

      return NextResponse.json({ success: true, competitor: created });
    }

    // Action 2: Add Competitor Backlink Gap
    if (action === "add-backlink") {
      const { competitorId, referringDomain, referringUrl, anchorText, targetUrl, linkType } = body;
      if (!competitorId || !referringDomain || !referringUrl || !targetUrl) {
        return NextResponse.json({ error: "Missing required backlink fields" }, { status: 400 });
      }

      const backlink = await prisma.competitorBacklink.create({
        data: {
          competitorId,
          referringDomain,
          referringUrl,
          anchorText,
          targetUrl,
          linkType: linkType || "Editorial",
          gapStatus: "QUALIFIED_PROSPECT",
        },
      });

      return NextResponse.json({ success: true, backlink });
    }

    // Action 3: Convert Competitor Backlink to Settle Loan Expert Prospect
    if (action === "convert-to-prospect") {
      const { competitorBacklinkId, category, targetLandingPage } = body;
      const compLink = await prisma.competitorBacklink.findUnique({
        where: { id: competitorBacklinkId },
        include: { competitor: true },
      });

      if (!compLink) {
        return NextResponse.json({ error: "Competitor link not found" }, { status: 404 });
      }

      // Check if prospect already exists
      const existing = await prisma.seoProspect.findFirst({
        where: { domain: compLink.referringDomain },
      });

      if (existing) {
        return NextResponse.json({ error: "Prospect already exists in database" }, { status: 400 });
      }

      const prospect = await prisma.seoProspect.create({
        data: {
          domain: compLink.referringDomain,
          pageUrl: compLink.referringUrl,
          title: `Publisher citing ${compLink.competitor.companyName}`,
          category: category || "Personal Finance",
          topicalRelevance: 25,
          editorialCredibility: 15,
          audiencePotential: 12,
          indianRelevance: 8,
          editorialOpportunity: 10,
          websiteQuality: 7,
          priorityScore: 77,
          outreachStatus: "QUALIFIED",
          notes: `Discovered from competitor analysis (${compLink.competitor.companyName}). Anchor text was: "${compLink.anchorText || 'N/A'}"`,
          targetLandingPage: targetLandingPage || "/services/loan-settlement",
        },
      });

      await prisma.competitorBacklink.update({
        where: { id: competitorBacklinkId },
        data: { gapStatus: "QUALIFIED_PROSPECT" },
      });

      return NextResponse.json({ success: true, prospect });
    }

    // Action 4: Bulk CSV Import
    if (action === "bulk-import-csv") {
      const { rows } = body; // Array of { competitorDomain, referringDomain, referringUrl, anchorText, targetUrl, linkType }
      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json({ error: "No rows provided for import" }, { status: 400 });
      }

      let importedCount = 0;
      for (const row of rows) {
        if (!row.competitorDomain || !row.referringUrl) continue;
        const compDomain = row.competitorDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();

        let competitor = await prisma.competitorDomain.findUnique({
          where: { domain: compDomain },
        });

        if (!competitor) {
          competitor = await prisma.competitorDomain.create({
            data: {
              domain: compDomain,
              companyName: row.companyName || compDomain,
            },
          });
        }

        await prisma.competitorBacklink.create({
          data: {
            competitorId: competitor.id,
            referringDomain: row.referringDomain || new URL(row.referringUrl).hostname,
            referringUrl: row.referringUrl,
            anchorText: row.anchorText || "",
            targetUrl: row.targetUrl || `https://${compDomain}`,
            linkType: row.linkType || "Editorial",
            gapStatus: "UNEXPLORED",
          },
        });
        importedCount++;
      }

      return NextResponse.json({ success: true, importedCount });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Competitors POST error:", error);
    return NextResponse.json({ error: "Failed to process competitor action" }, { status: 500 });
  }
}
