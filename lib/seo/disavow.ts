/**
 * Settle Loan Expert — Disavow File Generator & Toxicity Engine
 *
 * Formats disavow files strictly following Google Search Central standards.
 */

export interface ToxicLinkEntry {
  referringUrl: string;
  domain: string;
  toxicityScore: number;
  reason: string;
  isDomainLevel: boolean;
}

export function generateGoogleDisavowContent(entries: ToxicLinkEntry[]): string {
  const timestamp = new Date().toISOString().split("T")[0];
  const lines: string[] = [
    `# Settle Loan Expert (https://settleloanexpert.in/)`,
    `# Google Disavow File generated on ${timestamp}`,
    `# Warning: This file explicitly instructs Google to ignore links from specified sources.`,
    `# White-Hat SEO Governance Engine`,
    ``,
  ];

  const domainSet = new Set<string>();
  const urlList: string[] = [];

  for (const entry of entries) {
    if (entry.isDomainLevel || entry.toxicityScore >= 80) {
      domainSet.add(entry.domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase());
    } else {
      urlList.push(entry.referringUrl);
    }
  }

  if (domainSet.size > 0) {
    lines.push(`# --- Domain-level Disavows (${domainSet.size} domains) ---`);
    for (const domain of Array.from(domainSet).sort()) {
      lines.push(`domain:${domain}`);
    }
    lines.push(``);
  }

  if (urlList.length > 0) {
    lines.push(`# --- Individual Page Disavows (${urlList.length} pages) ---`);
    for (const url of urlList.sort()) {
      lines.push(url);
    }
    lines.push(``);
  }

  return lines.join("\n");
}
