"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  HelpCircle,
  ArrowRight,
  Phone,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    inProgressLeads: 0,
    convertedLeads: 0,
    totalPosts: 0,
    totalFaqs: 0,
  };

  const recentLeads = data?.recentLeads || [];
  const categoryCounts = data?.categoryCounts || [];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Overview of website enquiries, lead pipeline, and content status
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-brand-border text-xs font-semibold text-brand-navy hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Total Enquiries
            </div>
            <div className="text-2xl font-black text-brand-navy mt-1">
              {metrics.totalLeads}
            </div>
            <div className="text-[11px] text-brand-emerald font-semibold mt-0.5">
              Across all channels
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-emerald flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              New Enquiries
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {metrics.newLeads}
            </div>
            <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
              Awaiting advisor callback
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              In Active Negotiation
            </div>
            <div className="text-2xl font-black text-brand-navy mt-1">
              {metrics.inProgressLeads}
            </div>
            <div className="text-[11px] text-brand-muted mt-0.5">
              With bank settlement desks
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Converted */}
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Resolved & Settled
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {metrics.convertedLeads}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              OTS letters executed
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Leads Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-brand-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-brand-navy">
              Recent Case Enquiries
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-brand-emerald hover:underline flex items-center gap-1"
            >
              View All Leads <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Loan Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No enquiries registered yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-semibold text-brand-navy">
                        {lead.fullName}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono">
                        {lead.mobile}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                          {lead.loanCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            lead.status === "NEW"
                              ? "bg-amber-100 text-amber-800"
                              : lead.status === "CONTACTED"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "CONVERTED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown & Quick Links (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-brand-navy">
              Enquiry Distribution
            </h2>
            <div className="space-y-2.5">
              {categoryCounts.length === 0 ? (
                <p className="text-xs text-slate-400">No categories recorded yet.</p>
              ) : (
                categoryCounts.map((cat: any) => (
                  <div
                    key={cat.loanCategory}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-brand-surface border border-slate-100"
                  >
                    <span className="font-medium text-brand-navy">
                      {cat.loanCategory}
                    </span>
                    <span className="font-bold text-brand-emerald font-mono">
                      {cat._count.id}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Management Links */}
          <div className="bg-brand-navy p-5 rounded-2xl text-white space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-emerald-light">
              Quick Shortcuts
            </h3>
            <div className="space-y-1.5 text-xs">
              <Link
                href="/admin/blogs"
                className="block p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                + Publish New Educational Article
              </Link>
              <Link
                href="/admin/faqs"
                className="block p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                + Manage Settlement FAQs
              </Link>
              <Link
                href="/admin/settings"
                className="block p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                ⚙ Update Contact & Zoho Form URL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
