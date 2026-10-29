import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { auditInternalPage } from "@/lib/seo/audit";

const PUBLIC_PAGES_TO_AUDIT = [
  { path: "/", canonical: "https://settleloanexpert.in" },
  { path: "/about", canonical: "https://settleloanexpert.in/about" },
  { path: "/services/loan-settlement", canonical: "https://settleloanexpert.in/services/loan-settlement" },
  { path: "/services/credit-card-debt-settlement", canonical: "https://settleloanexpert.in/services/credit-card-debt-settlement" },
  { path: "/services/personal-loan-settlement", canonical: "https://settleloanexpert.in/services/personal-loan-settlement" },
  { path: "/services/business-loan-assistance", canonical: "https://settleloanexpert.in/services/business-loan-assistance" },
  { path: "/services/debt-counselling-repayment-guidance", canonical: "https://settleloanexpert.in/services/debt-counselling-repayment-guidance" },
  { path: "/how-it-works", canonical: "https://settleloanexpert.in/how-it-works" },
  { path: "/free-consultation", canonical: "https://settleloanexpert.in/free-consultation" },
  { path: "/faqs", canonical: "https://settleloanexpert.in/faqs" },
  { path: "/blog", canonical: "https://settleloanexpert.in/blog" },
  { path: "/blog/understanding-loan-settlement-in-india-guide", canonical: "https://settleloanexpert.in/blog/understanding-loan-settlement-in-india-guide" },
  { path: "/blog/rebuilding-cibil-score-post-settlement", canonical: "https://settleloanexpert.in/blog/rebuilding-cibil-score-post-settlement" },
  { path: "/blog/credit-card-debt-resolution-strategies", canonical: "https://settleloanexpert.in/blog/credit-card-debt-resolution-strategies" },
  { path: "/blog/rbi-fair-practices-code-borrower-rights", canonical: "https://settleloanexpert.in/blog/rbi-fair-practices-code-borrower-rights" },
  { path: "/blog/rbi-mandates-loan-settlement-2026-cibil-reporting-penal-charges", canonical: "https://settleloanexpert.in/blog/rbi-mandates-loan-settlement-2026-cibil-reporting-penal-charges" },
  { path: "/contact", canonical: "https://settleloanexpert.in/contact" },
  { path: "/privacy-policy", canonical: "https://settleloanexpert.in/privacy-policy" },
  { path: "/terms-and-conditions", canonical: "https://settleloanexpert.in/terms-and-conditions" },
  { path: "/disclaimer", canonical: "https://settleloanexpert.in/disclaimer" },
  { path: "/grievance-redressal", canonical: "https://settleloanexpert.in/grievance-redressal" },
];

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const findings = await prisma.seoAuditFinding.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, findings, totalPagesAudited: PUBLIC_PAGES_TO_AUDIT.length });
  } catch (error: unknown) {
    console.error("Audit GET error:", error);
    return NextResponse.json({ error: "Failed to fetch audit findings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    let discoveredIssuesCount = 0;

    // Reset previous unresolved findings
    await prisma.seoAuditFinding.deleteMany({ where: { isResolved: false } });

    for (const page of PUBLIC_PAGES_TO_AUDIT) {
      const fullUrl = `${baseUrl}${page.path}`;
      const report = await auditInternalPage(fullUrl, page.canonical);

      if (report.issues.length > 0) {
        for (const issue of report.issues) {
          await prisma.seoAuditFinding.create({
            data: {
              url: page.path,
              pageTitle: report.title || "Untitled Page",
              issueType: issue.issueType,
              severity: issue.severity,
              description: issue.description,
              recommendation: issue.recommendation,
              isResolved: false,
            },
          });
          discoveredIssuesCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      auditedPages: PUBLIC_PAGES_TO_AUDIT.length,
      discoveredIssuesCount,
    });
  } catch (error: unknown) {
    console.error("Audit POST error:", error);
    return NextResponse.json({ error: "Failed to execute SEO audit" }, { status: 500 });
  }
}
