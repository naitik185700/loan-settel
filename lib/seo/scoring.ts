/**
 * Settle Loan Expert — White-Hat SEO Opportunity Scoring Engine
 *
 * NOTE: This is an internal editorial evaluation model reflecting business priorities,
 * NOT a replica of Google's proprietary ranking algorithm.
 */

export interface ScoreFactors {
  topicalRelevance: number;     // Max 30: Loan settlement, debt relief, banking, CIBIL, personal finance
  editorialCredibility: number; // Max 20: Editorial guidelines, named authors, bylines, journalistic standards
  audiencePotential: number;    // Max 15: Indian borrowers, salaried/business owners in financial distress
  indianRelevance: number;      // Max 10: Specific to Indian regulatory context (RBI, Lok Adalat, DRT, SARFAESI)
  editorialOpportunity: number; // Max 15: Genuine guest articles, expert roundups, resource page inclusion
  websiteQuality: number;       // Max 10: Clean UX, fast load, no ad clutter, HTTPS
}

export interface ScoreResult {
  totalScore: number;
  grade: "A (Exceptional)" | "B (High Value)" | "C (Moderate)" | "D (Marginal)" | "F (Spam / Unqualified)";
  action: "Immediate Outreach" | "Prioritize Pitch" | "Standard Review" | "Low Priority" | "Reject / Disqualify";
  spamFlags: string[];
}

export const SPAM_INDICATOR_PATTERNS = [
  { flag: "LINK_FARM", label: "Link Farm / Unrelated Outbound Links", regex: /(casino|gambling|betting|crypto-arbitrage|essay-writing|replica-watch)/i },
  { flag: "PAID_POST_SCHEME", label: "Explicit Sponsored / Paid Link Network", regex: /(buy backlinks|paid guest post|do-follow package|sponsored review $)/i },
  { flag: "NO_EDITORIAL_CONTACT", label: "Missing Editorial Masthead or Contact Info", regex: /(no contact|anonymous author only|private whois only)/i },
  { flag: "SPAMMY_DIRECTORY", label: "Low Quality Auto-Approve Directory", regex: /(free directory submission|auto-approve backlinks|pr9 directory)/i },
];

export function computeProspectScore(factors: ScoreFactors, notesOrText?: string): ScoreResult {
  const topical = Math.min(30, Math.max(0, factors.topicalRelevance || 0));
  const credibility = Math.min(20, Math.max(0, factors.editorialCredibility || 0));
  const audience = Math.min(15, Math.max(0, factors.audiencePotential || 0));
  const indian = Math.min(10, Math.max(0, factors.indianRelevance || 0));
  const opportunity = Math.min(15, Math.max(0, factors.editorialOpportunity || 0));
  const quality = Math.min(10, Math.max(0, factors.websiteQuality || 0));

  let totalScore = topical + credibility + audience + indian + opportunity + quality;

  // Detect spam indicators
  const spamFlags: string[] = [];
  if (notesOrText) {
    for (const pattern of SPAM_INDICATOR_PATTERNS) {
      if (pattern.regex.test(notesOrText)) {
        spamFlags.push(pattern.flag);
      }
    }
  }

  // Deduct points for high-risk flags
  if (spamFlags.includes("LINK_FARM")) totalScore = Math.max(0, totalScore - 40);
  if (spamFlags.includes("PAID_POST_SCHEME")) totalScore = Math.max(0, totalScore - 30);
  if (spamFlags.includes("SPAMMY_DIRECTORY")) totalScore = Math.max(0, totalScore - 25);

  let grade: ScoreResult["grade"] = "F (Spam / Unqualified)";
  let action: ScoreResult["action"] = "Reject / Disqualify";

  if (totalScore >= 80 && spamFlags.length === 0) {
    grade = "A (Exceptional)";
    action = "Immediate Outreach";
  } else if (totalScore >= 65 && spamFlags.length === 0) {
    grade = "B (High Value)";
    action = "Prioritize Pitch";
  } else if (totalScore >= 50) {
    grade = "C (Moderate)";
    action = "Standard Review";
  } else if (totalScore >= 35) {
    grade = "D (Marginal)";
    action = "Low Priority";
  }

  return {
    totalScore,
    grade,
    action,
    spamFlags,
  };
}
