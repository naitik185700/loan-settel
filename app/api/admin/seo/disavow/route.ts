import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateGoogleDisavowContent } from "@/lib/seo/disavow";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");

  try {
    const disavowedBacklinks = await prisma.monitoredBacklink.findMany({
      where: { isDisavowed: true },
      orderBy: { updatedAt: "desc" },
    });

    const toxicEntries = disavowedBacklinks.map((link) => {
      let domain = "";
      try {
        domain = new URL(link.referringUrl).hostname;
      } catch {
        domain = link.referringUrl;
      }
      return {
        referringUrl: link.referringUrl,
        domain,
        toxicityScore: link.toxicityScore,
        reason: link.toxicityReason || "Flagged as unnatural or toxic link",
        isDomainLevel: link.toxicityScore >= 70,
      };
    });

    // If text format requested, return downloadable disavow.txt content
    if (format === "txt") {
      const textContent = generateGoogleDisavowContent(toxicEntries);
      return new Response(textContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": 'attachment; filename="disavow.txt"',
        },
      });
    }

    return NextResponse.json({
      success: true,
      totalDisavowed: disavowedBacklinks.length,
      entries: toxicEntries,
    });
  } catch (error: unknown) {
    console.error("Disavow GET error:", error);
    return NextResponse.json({ error: "Failed to generate disavow list" }, { status: 500 });
  }
}
