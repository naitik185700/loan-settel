"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Info,
  Calendar,
  CheckCircle2,
} from "lucide-react";

interface SearchQuery {
  id: string;
  query: string;
  page: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  isEstimated: boolean;
  date: string;
}

interface ChannelData {
  id: string;
  channel: string;
  sessions: number;
  users: number;
  enquiryLeads: number;
  bounceRate: number;
  isEstimated: boolean;
}

export default function AnalyticsPerformancePage() {
  const [queries, setQueries] = useState<SearchQuery[]>([]);
  const [channels, setChannels] = useState<ChannelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddQueryModal, setShowAddQueryModal] = useState(false);

  // Form State
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(15);
  const [impressions, setImpressions] = useState(300);
  const [position, setPosition] = useState(5.2);
  const [page, setPage] = useState("https://settleloanexpert.in/services/loan-settlement");

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/seo/analytics");
      if (res.ok) {
        const data = await res.json();
        setQueries(data.queries || []);
        setChannels(data.channels || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleAddQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add-query",
          query,
          clicks,
          impressions,
          position,
          page,
        }),
      });

      if (res.ok) {
        setShowAddQueryModal(false);
        setQuery("");
        fetchAnalytics();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalClicks = queries.reduce((acc, q) => acc + q.clicks, 0);
  const totalImpressions = queries.reduce((acc, q) => acc + q.impressions, 0);
  const totalLeads = channels.reduce((acc, c) => acc + c.enquiryLeads, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Search Console & Analytics Performance</h1>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Conversion Tracking Active
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Track organic clicks, search queries, rankings, and lead conversions for Settle Loan Expert.
          </p>
        </div>

        <button
          onClick={() => setShowAddQueryModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Verified Query</span>
        </button>
      </div>

      {/* Accuracy Disclosure */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-emerald shrink-0" />
          <span>
            <strong>Data Governance Notice:</strong> In adherence with white-hat compliance rules, all metrics are clearly tagged as either <em>Estimated / Benchmark</em> or <em>Verified Input</em>.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Total Clicks</div>
          <div className="text-3xl font-bold text-brand-navy mt-1">{totalClicks.toLocaleString()}</div>
          <div className="text-xs text-brand-muted mt-0.5">High-intent borrower searches</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Impressions</div>
          <div className="text-3xl font-bold text-brand-navy mt-1">{totalImpressions.toLocaleString()}</div>
          <div className="text-xs text-brand-muted mt-0.5">Google Search SERP appearances</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Avg CTR</div>
          <div className="text-3xl font-bold text-brand-navy mt-1">
            {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0"}%
          </div>
          <div className="text-xs text-brand-muted mt-0.5">Above personal finance benchmark</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-emerald">Enquiry Leads</div>
          <div className="text-3xl font-bold text-brand-emerald mt-1">{totalLeads}</div>
          <div className="text-xs text-brand-muted mt-0.5">Qualified consultative submissions</div>
        </div>
      </div>

      {/* Channels Breakdown */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
        <h2 className="text-base font-bold text-brand-navy mb-4">Traffic Acquisition & Conversion by Channel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {channels.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">{c.channel}</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {c.isEstimated ? "Estimated" : "Verified"}
                </span>
              </div>
              <div className="text-2xl font-bold text-brand-navy mt-2">{c.sessions} sessions</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">
                {c.enquiryLeads} Enquiry Leads ({( (c.enquiryLeads / (c.sessions || 1)) * 100 ).toFixed(1)}% CVR)
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Bounce Rate: {c.bounceRate}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Queries Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-brand-navy">Google Search Console Top Queries</h2>
          <span className="text-xs text-brand-muted">Showing top performing queries</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : queries.length === 0 ? (
          <div className="text-center p-12">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No queries recorded yet</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Search Query</th>
                  <th className="py-3 px-4">Target Landing Page</th>
                  <th className="py-3 px-4 text-center">Clicks</th>
                  <th className="py-3 px-4 text-center">Impressions</th>
                  <th className="py-3 px-4 text-center">CTR %</th>
                  <th className="py-3 px-4 text-center">Avg Position</th>
                  <th className="py-3 px-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {queries.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-brand-navy">
                      &ldquo;{q.query}&rdquo;
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 truncate max-w-xs">
                      {q.page ? new URL(q.page).pathname : "/services/loan-settlement"}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-brand-navy">
                      {q.clicks}
                    </td>

                    <td className="py-3.5 px-4 text-center text-slate-600">
                      {q.impressions.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-emerald-600">
                      {q.ctr.toFixed(2)}%
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono">
                      #{q.position.toFixed(1)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        q.isEstimated ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {q.isEstimated ? "Estimated" : "Verified Input"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Verified Query Modal */}
      {showAddQueryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Record GSC Query Performance</h3>
            <form onSubmit={handleAddQuery} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Search Query *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. loan settlement gurugram rbi rules"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Clicks</label>
                  <input
                    type="number"
                    min="0"
                    value={clicks}
                    onChange={(e) => setClicks(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Impressions</label>
                  <input
                    type="number"
                    min="0"
                    value={impressions}
                    onChange={(e) => setImpressions(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Average Ranking Position</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  value={position}
                  onChange={(e) => setPosition(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Target Landing Page</label>
                <input
                  type="url"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddQueryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                >
                  Save Query Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
