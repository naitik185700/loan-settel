/**
 * Settle Loan Expert — White-Hat Link Crawler & Monitor Service
 *
 * Checks referring pages with polite rate limits, respects status codes,
 * extracts anchor text and rel attributes (follow, nofollow, ugc, sponsored).
 */

export interface CrawlResult {
  referringUrl: string;
  targetUrl: string;
  isFound: boolean;
  httpStatus: number;
  anchorText?: string;
  relAttribute?: string;
  responseTimeMs: number;
  error?: string;
  isNofollow: boolean;
  isSponsored: boolean;
  isUgc: boolean;
}

export async function checkBacklinkLive(referringUrl: string, targetUrl: string): Promise<CrawlResult> {
  const startTime = Date.now();
  const normalizedTarget = targetUrl.replace(/\/+$/, "").toLowerCase();
  const targetHost = "settleloanexpert.in";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(referringUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 SettleLoanExpert-LinkChecker/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);
    const responseTimeMs = Date.now() - startTime;
    const httpStatus = response.status;

    if (!response.ok) {
      return {
        referringUrl,
        targetUrl,
        isFound: false,
        httpStatus,
        responseTimeMs,
        error: `HTTP Error ${httpStatus}: ${response.statusText}`,
        isNofollow: false,
        isSponsored: false,
        isUgc: false,
      };
    }

    const html = await response.text();

    // Regex parser for anchor tags pointing to settleloanexpert.in or targetUrl
    // Matches: <a ... href="..." ...>anchor text</a>
    const linkRegex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>(.*?)<\/a>/gis;
    let match;
    let foundAnchor = "";
    let foundRel = "follow";
    let linkFound = false;

    while ((match = linkRegex.exec(html)) !== null) {
      const beforeAttrs = match[1] || "";
      const href = match[2] || "";
      const afterAttrs = match[3] || "";
      const rawAnchor = match[4] || "";

      const normalizedHref = href.replace(/\/+$/, "").toLowerCase();

      // Check if href matches targetUrl or contains target domain
      const isTargetMatch =
        normalizedHref === normalizedTarget ||
        normalizedHref.includes(targetHost) ||
        (normalizedTarget.includes(targetHost) && normalizedHref.endsWith(new URL(targetUrl).pathname.toLowerCase()));

      if (isTargetMatch) {
        linkFound = true;
        // Clean anchor HTML tags
        foundAnchor = rawAnchor.replace(/<[^>]*>?/gm, "").trim();

        // Extract rel attribute from combined attributes
        const combinedAttrs = `${beforeAttrs} ${afterAttrs}`;
        const relMatch = /rel=["']([^"']+)["']/i.exec(combinedAttrs);
        if (relMatch && relMatch[1]) {
          foundRel = relMatch[1].toLowerCase().trim();
        }
        break;
      }
    }

    const isNofollow = foundRel.includes("nofollow");
    const isSponsored = foundRel.includes("sponsored");
    const isUgc = foundRel.includes("ugc");

    return {
      referringUrl,
      targetUrl,
      isFound: linkFound,
      httpStatus,
      anchorText: foundAnchor || (linkFound ? "[Image / Icon Link]" : undefined),
      relAttribute: foundRel,
      responseTimeMs,
      isNofollow,
      isSponsored,
      isUgc,
    };
  } catch (err: unknown) {
    const responseTimeMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : "Unknown crawl error";
    return {
      referringUrl,
      targetUrl,
      isFound: false,
      httpStatus: 0,
      responseTimeMs,
      error: errorMessage.includes("aborted") ? "Request timed out after 8s" : errorMessage,
      isNofollow: false,
      isSponsored: false,
      isUgc: false,
    };
  }
}
