"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Target,
  Send,
  Link2,
  Building2,
  Activity,
  AlertTriangle,
  FileSearch,
  TrendingUp,
  FolderDown,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

interface OverviewMetrics {
  prospects: { total: number; qualified: number };
  outreach: { approvedPitches: number; sentPitches: number };
  backlinks: { live: number; total: number; lost: number; disavowed: number };
  directories: { live: number; total: number };
  competitors: { openGaps: number };
  technicalAudit: { unresolvedIssues: number };
  searchPerformance: {
    totalClicks: number;
    totalImpressions: number;
    avgPosition: number;
    avgCtr: number;
    organicLeads: number;
    totalSessions: number;
    isEstimated: boolean;
  };
}

export default function SeoOverviewPage() {
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/admin/seo/overview");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOverview();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">SEO & Backlink Command Center</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% White-Hat
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Editorial outreach, competitor intelligence, Gurugram business citations, and link health monitoring for Settle Loan Expert.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-brand-border text-brand-navy hover:bg-slate-50 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-brand-emerald" : ""}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            href="/admin/seo/prospects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
          >
            <Target className="w-4 h-4" />
            <span>Discover Prospects</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Prospects */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Target Prospects</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-brand-navy">{metrics?.prospects.total || 0}</div>
            <div className="text-xs text-brand-muted mt-1 flex items-center gap-1">
              <span className="font-semibold text-emerald-600">{metrics?.prospects.qualified || 0}</span> high-priority opportunities
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/admin/seo/prospects" className="text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1">
              View Pipeline <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Live Backlinks */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Active Backlinks</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-brand-emerald">
              <Link2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-brand-navy">{metrics?.backlinks.live || 0}</div>
            <div className="text-xs text-brand-muted mt-1 flex items-center gap-1">
              <span>{metrics?.backlinks.total || 0} total monitored</span>
              {metrics && metrics.backlinks.lost > 0 && (
                <span className="text-red-500 font-semibold">• {metrics.backlinks.lost} broken/lost</span>
              )}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/admin/seo/monitoring" className="text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1">
              Run Live Checker <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Outreach Pitches */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Approved Pitches</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-brand-navy">{metrics?.outreach.approvedPitches || 0}</div>
            <div className="text-xs text-brand-muted mt-1">
              <span className="font-semibold text-purple-600">{metrics?.outreach.sentPitches || 0}</span> pitches delivered to editors
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/admin/seo/outreach" className="text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1">
              Manage Outreach <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Gurugram & National Directories */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Verified Citations</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-brand-navy">{metrics?.directories.live || 0}</div>
            <div className="text-xs text-brand-muted mt-1">
              <span>{metrics?.directories.total || 0} directories tracked (NAP Verified)</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/admin/seo/directories" className="text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1">
              View Citations <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Console & Traffic Snapshot */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-brand-navy">Organic Search Performance Snapshot</h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {metrics?.searchPerformance.isEstimated ? "Estimated / Industry Benchmarked" : "API Verified"}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Organic search traction from Google Search Console and conversion attribution for Settle Loan Expert.
            </p>
          </div>

          <Link
            href="/admin/seo/analytics"
            className="text-xs text-brand-emerald font-semibold hover:underline inline-flex items-center gap-1"
          >
            Full Analytics Breakdown <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-brand-muted font-medium">Organic Clicks (30D)</div>
            <div className="text-2xl font-bold text-brand-navy mt-1">
              {metrics?.searchPerformance.totalClicks.toLocaleString() || 0}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">From Indian borrowers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-brand-muted font-medium">Total Impressions</div>
            <div className="text-2xl font-bold text-brand-navy mt-1">
              {metrics?.searchPerformance.totalImpressions.toLocaleString() || 0}
            </div>
            <div className="text-[11px] text-brand-muted mt-1 font-medium">Avg CTR: {metrics?.searchPerformance.avgCtr}%</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-brand-muted font-medium">Average Position</div>
            <div className="text-2xl font-bold text-brand-navy mt-1">
              #{metrics?.searchPerformance.avgPosition || 0}
            </div>
            <div className="text-[11px] text-brand-muted mt-1 font-medium">Top queries in Gurugram / NCR</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-brand-muted font-medium">Organic Enquiry Leads</div>
            <div className="text-2xl font-bold text-brand-emerald mt-1">
              {metrics?.searchPerformance.organicLeads || 0}
            </div>
            <div className="text-[11px] text-brand-muted mt-1 font-medium">Direct form & callback inquiries</div>
          </div>
        </div>
      </div>

      {/* Modules Quick Launch & Health Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Nav Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-brand-navy">SEO & Backlink Acquisition Modules</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/seo/competitors"
              className="p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-emerald hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                    Competitor Link Gap
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {metrics?.competitors.openGaps || 0} unexplored publisher opportunities from SingleDebt & Freed.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/seo/content"
              className="p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-emerald hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                    Linkable Content Assets
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    RBI Fair Practices Guide, Fake OTS Letter Checklist, and CIBIL Rebuilding roadmap.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/seo/audit"
              className="p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-emerald hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                    Technical SEO Health
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {metrics?.technicalAudit.unresolvedIssues || 0} open audit findings across 20 public routes.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/seo/disavow"
              className="p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-emerald hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
                    Toxicity & Disavow Tool
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {metrics?.backlinks.disavowed || 0} links quarantined. Google disavow.txt export ready.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Ethical Standards & Policy Guard */}
        <div className="bg-brand-navy-900 text-slate-200 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-emerald-light text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              White-Hat SEO Policy Guarantee
            </div>
            <h3 className="text-lg font-bold text-white mt-2">Zero Spam & Algorithm Safety</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Settle Loan Expert adheres strictly to Google Search Essentials:
            </p>

            <ul className="space-y-2 mt-4 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span><strong>No Paid Link Schemes:</strong> Never purchase do-follow backlinks or participate in PBNs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span><strong>Manual Approval Gates:</strong> Every pitch must be reviewed by an administrator before outreach.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span><strong>Authentic Metrics:</strong> Estimated numbers are explicitly distinguished from API-verified data.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span><strong>Natural Anchor Distribution:</strong> Brand, topical, and URL anchors maintained in healthy ratios.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-navy-800 text-[11px] text-slate-400">
            Last policy verification: Today • Settle Loan Expert Compliance Engine
          </div>
        </div>
      </div>
    </div>
  );
}
