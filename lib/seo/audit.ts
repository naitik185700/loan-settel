/**
 * Settle Loan Expert — Technical SEO Audit Engine
 *
 * Verifies public application routes for indexability, title tags,
 * canonical consistency, meta description standards, and robots compliance.
 */

export interface TechnicalAuditIssue {
  url: string;
  pageTitle?: string;
  issueType: "BROKEN_LINK" | "MISSING_CANONICAL" | "CANONICAL_MISMATCH" | "TITLE_LENGTH" | "MISSING_META" | "DESCRIPTION_LENGTH" | "MISSING_H1" | "MULTIPLE_H1";
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  description: string;
  recommendation: string;
}

export interface PageAuditReport {
  url: string;
  statusCode: number;
  title?: string;
  titleLength?: number;
  description?: string;
  descriptionLength?: number;
  canonical?: string;
  h1Tags: string[];
  issues: TechnicalAuditIssue[];
}

export async function auditInternalPage(fullUrl: string, expectedCanonical: string): Promise<PageAuditReport> {
  const issues: TechnicalAuditIssue[] = [];

  try {
    const res = await fetch(fullUrl, {
      headers: {
        "User-Agent": "SettleLoanExpert-TechnicalAuditor/1.0",
      },
    });

    const statusCode = res.status;
    if (!res.ok) {
      issues.push({
        url: fullUrl,
        issueType: "BROKEN_LINK",
        severity: "HIGH",
        description: `Page returned HTTP status code ${statusCode}`,
        recommendation: "Ensure route exists and returns 200 OK without unhandled server exceptions.",
      });
      return {
        url: fullUrl,
        statusCode,
        h1Tags: [],
        issues,
      };
    }

    const html = await res.text();

    // Extract Title
    const titleMatch = /<title[^>]*>(.*?)<\/title>/i.exec(html);
    const title = titleMatch ? titleMatch[1].trim() : undefined;
    const titleLength = title ? title.length : 0;

    if (!title) {
      issues.push({
        url: fullUrl,
        issueType: "TITLE_LENGTH",
        severity: "HIGH",
        description: "Page is missing an HTML <title> tag.",
        recommendation: "Add a descriptive 50-60 character page title including primary keyword and brand suffix.",
      });
    } else if (titleLength < 30) {
      issues.push({
        url: fullUrl,
        issueType: "TITLE_LENGTH",
        severity: "MEDIUM",
        description: `Title tag is too short (${titleLength} characters).`,
        recommendation: "Expand title to 50-60 characters to optimize SERP visibility.",
      });
    } else if (titleLength > 65) {
      issues.push({
        url: fullUrl,
        issueType: "TITLE_LENGTH",
        severity: "LOW",
        description: `Title tag is lengthy (${titleLength} characters) and may truncate on search results.`,
        recommendation: "Keep primary keywords in the first 60 characters.",
      });
    }

    // Extract Meta Description
    const metaDescMatch = /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i.exec(html) ||
      /<meta\s+content=["'](.*?)["']\s+name=["']description["']/i.exec(html);
    const description = metaDescMatch ? metaDescMatch[1].trim() : undefined;
    const descriptionLength = description ? description.length : 0;

    if (!description) {
      issues.push({
        url: fullUrl,
        issueType: "MISSING_META",
        severity: "HIGH",
        description: "Meta description is missing.",
        recommendation: "Add a clear meta description between 130 and 160 characters summarizing the service or guide.",
      });
    } else if (descriptionLength < 70) {
      issues.push({
        url: fullUrl,
        issueType: "DESCRIPTION_LENGTH",
        severity: "MEDIUM",
        description: `Meta description is too brief (${descriptionLength} characters).`,
        recommendation: "Provide a comprehensive 130-160 character explanation with a natural call to action.",
      });
    } else if (descriptionLength > 165) {
      issues.push({
        url: fullUrl,
        issueType: "DESCRIPTION_LENGTH",
        severity: "LOW",
        description: `Meta description exceeds 165 characters (${descriptionLength} chars).`,
        recommendation: "Shorten description slightly to prevent Google SERP clipping.",
      });
    }

    // Extract Canonical
    const canonicalMatch = /<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i.exec(html);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : undefined;

    if (!canonical) {
      issues.push({
        url: fullUrl,
        issueType: "MISSING_CANONICAL",
        severity: "MEDIUM",
        description: "Page lacks an explicit rel=canonical tag.",
        recommendation: `Add <link rel="canonical" href="${expectedCanonical}" /> in page head metadata.`,
      });
    } else if (canonical.toLowerCase() !== expectedCanonical.toLowerCase()) {
      issues.push({
        url: fullUrl,
        issueType: "CANONICAL_MISMATCH",
        severity: "MEDIUM",
        description: `Canonical URL points to '${canonical}' instead of expected '${expectedCanonical}'.`,
        recommendation: "Ensure canonical tag points strictly to the self-referencing absolute canonical URL.",
      });
    }

    // Extract H1 Tags
    const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]*>?/gm, "").trim());
    if (h1Matches.length === 0) {
      issues.push({
        url: fullUrl,
        issueType: "MISSING_H1",
        severity: "HIGH",
        description: "Page is missing an <h1> header.",
        recommendation: "Add exactly one semantic <h1> describing the primary topic.",
      });
    } else if (h1Matches.length > 1) {
      issues.push({
        url: fullUrl,
        issueType: "MULTIPLE_H1",
        severity: "LOW",
        description: `Page has ${h1Matches.length} <h1> tags.`,
        recommendation: "Prefer a single <h1> heading per document for clean semantic hierarchy.",
      });
    }

    return {
      url: fullUrl,
      statusCode,
      title,
      titleLength,
      description,
      descriptionLength,
      canonical,
      h1Tags: h1Matches,
      issues,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Network error during audit";
    issues.push({
      url: fullUrl,
      issueType: "BROKEN_LINK",
      severity: "HIGH",
      description: `Failed to fetch page: ${errorMsg}`,
      recommendation: "Verify server is up and responding locally or at production URL.",
    });

    return {
      url: fullUrl,
      statusCode: 0,
      h1Tags: [],
      issues,
    };
  }
}
