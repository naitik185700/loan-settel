"use client";

import React, { useState, useEffect } from "react";
import {
  FolderDown,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Building,
  Target,
  Link2,
  Activity,
  FileSearch,
} from "lucide-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async (endpoint: string, filename: string, mappingFn: (data: any) => string) => {
    try {
      setLoading(true);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      const csvContent = mappingFn(json);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Error generating CSV");
    } finally {
      setLoading(false);
    }
  };

  const exportProspects = () => {
    downloadCSV("/api/admin/seo/prospects", "settleloanexpert-prospects.csv", (data) => {
      const headers = ["Domain", "Page URL", "Title", "Category", "Priority Score", "Outreach Status", "Risk Flags", "Target Landing Page", "Contact Email"];
      const rows = (data.prospects || []).map((p: any) => [
        `"${p.domain}"`,
        `"${p.pageUrl}"`,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        p.priorityScore,
        `"${p.outreachStatus}"`,
        `"${p.riskIndicators || 'CLEAN'}"`,
        `"${p.targetLandingPage || ''}"`,
        `"${p.contactEmail || ''}"`,
      ]);
      return [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    });
  };

  const exportBacklinks = () => {
    downloadCSV("/api/admin/seo/monitoring", "settleloanexpert-monitored-backlinks.csv", (data) => {
      const headers = ["Referring URL", "Target URL", "Anchor Text", "Rel Attribute", "HTTP Status", "Is Live", "Toxicity Score", "Last Checked"];
      const rows = (data.backlinks || []).map((b: any) => [
        `"${b.referringUrl}"`,
        `"${b.targetUrl}"`,
        `"${(b.anchorText || '').replace(/"/g, '""')}"`,
        `"${b.relAttribute}"`,
        b.httpStatus,
        b.isLive ? "YES" : "NO",
        b.toxicityScore,
        `"${b.lastCheckedAt || 'Never'}"`,
      ]);
      return [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    });
  };

  const exportDirectories = () => {
    downloadCSV("/api/admin/seo/directories", "settleloanexpert-directory-citations.csv", (data) => {
      const headers = ["Directory Name", "Directory URL", "Listing URL", "Category", "Status", "NAP Consistent", "Backlink Verified", "Rel Tag"];
      const rows = (data.directories || []).map((d: any) => [
        `"${d.name}"`,
        `"${d.directoryUrl}"`,
        `"${d.listingUrl || ''}"`,
        `"${d.category}"`,
        `"${d.status}"`,
        d.napConsistent ? "YES" : "NO",
        d.backlinkVerified ? "YES" : "NO",
        `"${d.relAttribute || 'nofollow'}"`,
      ]);
      return [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    });
  };

  const exportAuditFindings = () => {
    downloadCSV("/api/admin/seo/audit", "settleloanexpert-technical-audit.csv", (data) => {
      const headers = ["Page Route", "Issue Type", "Severity", "Description", "Recommendation", "Is Resolved"];
      const rows = (data.findings || []).map((f: any) => [
        `"${f.url}"`,
        `"${f.issueType}"`,
        `"${f.severity}"`,
        `"${f.description.replace(/"/g, '""')}"`,
        `"${f.recommendation.replace(/"/g, '""')}"`,
        f.isResolved ? "YES" : "NO",
      ]);
      return [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Reports & Data Exports</h1>
          <p className="text-sm text-brand-muted mt-1">
            Export structured CSV datasets for stakeholders, management reviews, or external auditing.
          </p>
        </div>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Prospect Pipeline CSV</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Complete dataset of discovered publishers with 100-pt priority scores and outreach stages.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-brand-muted">Format: UTF-8 CSV</span>
            <button
              onClick={exportProspects}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Prospects</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-brand-emerald">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Backlink Portfolio CSV</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Verified live backlinks, anchor text distribution, rel attributes, and crawl check logs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-brand-muted">Format: UTF-8 CSV</span>
            <button
              onClick={exportBacklinks}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backlinks</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Directory Citations CSV</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Gurugram and national business directories, NAP compliance records, and approval status.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-brand-muted">Format: UTF-8 CSV</span>
            <button
              onClick={exportDirectories}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Citations</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Technical SEO Audit CSV</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  All crawler findings categorized by severity, page URL, and corrective recommendations.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-brand-muted">Format: UTF-8 CSV</span>
            <button
              onClick={exportAuditFindings}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Findings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
