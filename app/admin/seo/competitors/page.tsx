"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Plus,
  ExternalLink,
  Target,
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";

interface CompetitorBacklink {
  id: string;
  referringDomain: string;
  referringUrl: string;
  anchorText: string | null;
  targetUrl: string;
  linkType: string | null;
  gapStatus: string;
}

interface CompetitorDomain {
  id: string;
  domain: string;
  companyName: string;
  marketFocus: string | null;
  notes: string | null;
  backlinks: CompetitorBacklink[];
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<CompetitorDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCompetitorModal, setShowAddCompetitorModal] = useState(false);
  const [showAddBacklinkModal, setShowAddBacklinkModal] = useState(false);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>("");

  // Modals state
  const [newCompDomain, setNewCompDomain] = useState("");
  const [newCompName, setNewCompName] = useState("");
  const [newCompFocus, setNewCompFocus] = useState("");
  const [newCompNotes, setNewCompNotes] = useState("");

  const [newBacklink, setNewBacklink] = useState({
    referringDomain: "",
    referringUrl: "",
    anchorText: "",
    targetUrl: "",
    linkType: "Editorial",
  });

  const fetchCompetitors = async () => {
    try {
      const res = await fetch("/api/admin/seo/competitors");
      if (res.ok) {
        const data = await res.json();
        setCompetitors(data.competitors || []);
        if (data.competitors?.length > 0 && !selectedCompetitorId) {
          setSelectedCompetitorId(data.competitors[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, []);

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add-domain",
          domain: newCompDomain,
          companyName: newCompName,
          marketFocus: newCompFocus,
          notes: newCompNotes,
        }),
      });

      if (res.ok) {
        setShowAddCompetitorModal(false);
        setNewCompDomain("");
        setNewCompName("");
        setNewCompFocus("");
        setNewCompNotes("");
        fetchCompetitors();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBacklink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add-backlink",
          competitorId: selectedCompetitorId,
          ...newBacklink,
        }),
      });

      if (res.ok) {
        setShowAddBacklinkModal(false);
        setNewBacklink({
          referringDomain: "",
          referringUrl: "",
          anchorText: "",
          targetUrl: "",
          linkType: "Editorial",
        });
        fetchCompetitors();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConvertToProspect = async (backlinkId: string) => {
    try {
      const res = await fetch("/api/admin/seo/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "convert-to-prospect",
          competitorBacklinkId: backlinkId,
        }),
      });

      if (res.ok) {
        alert("Converted competitor citation to Settle Loan Expert qualified prospect!");
        fetchCompetitors();
      } else {
        const d = await res.json();
        alert(d.error || "Failed to convert");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeCompetitor = competitors.find((c) => c.id === selectedCompetitorId) || competitors[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Competitor Link Gap Intelligence</h1>
          <p className="text-sm text-brand-muted mt-1">
            Analyze backlink footprints of Indian debt resolution agencies (SingleDebt, Freed) and discover high-authority editorial gaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddCompetitorModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-brand-border text-brand-navy hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Building className="w-4 h-4 text-brand-emerald" />
            <span>Add Competitor</span>
          </button>
          <button
            onClick={() => setShowAddBacklinkModal(true)}
            disabled={!activeCompetitor}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>Add Competitor Link</span>
          </button>
        </div>
      </div>

      {/* Competitors Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-brand-border">
        {competitors.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedCompetitorId(comp.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedCompetitorId === comp.id
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-brand-muted hover:text-brand-navy hover:bg-slate-50 border border-brand-border"
            }`}
          >
            <span>{comp.companyName}</span>
            <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {comp.backlinks.length} links
            </span>
          </button>
        ))}
      </div>

      {/* Selected Competitor Overview */}
      {activeCompetitor && (
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-brand-navy">{activeCompetitor.companyName}</h2>
              <span className="text-xs font-mono text-brand-emerald bg-brand-surface px-2 py-0.5 rounded border border-brand-border">
                {activeCompetitor.domain}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-1">
              {activeCompetitor.marketFocus || "General Indian debt settlement consultancy."}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-brand-muted">Total Citing Domains: <strong>{activeCompetitor.backlinks.length}</strong></span>
          </div>
        </div>
      )}

      {/* Backlinks Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : !activeCompetitor || activeCompetitor.backlinks.length === 0 ? (
          <div className="text-center p-12">
            <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No competitor backlinks logged</h3>
            <p className="text-xs text-brand-muted mt-1">Add backlinks manually or import via CSV to begin gap analysis.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Referring Publisher URL</th>
                  <th className="py-3 px-4">Anchor Text Used</th>
                  <th className="py-3 px-4">Link Classification</th>
                  <th className="py-3 px-4">SLE Gap Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {activeCompetitor.backlinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-brand-navy flex items-center gap-1.5">
                        <span className="font-mono text-xs">{link.referringDomain}</span>
                        <a
                          href={link.referringUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-emerald"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-md">
                        {link.referringUrl}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-brand-navy">
                      &ldquo;{link.anchorText || "[Image / Brand Link]"}&rdquo;
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {link.linkType || "Editorial"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        link.gapStatus === "QUALIFIED_PROSPECT"
                          ? "bg-purple-100 text-purple-800"
                          : link.gapStatus === "ACQUIRED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {link.gapStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {link.gapStatus !== "ACQUIRED" ? (
                        <button
                          onClick={() => handleConvertToProspect(link.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald hover:text-white transition-colors"
                        >
                          <Target className="w-3.5 h-3.5" />
                          <span>Convert to Prospect</span>
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-600 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Acquired
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Competitor Domain Modal */}
      {showAddCompetitorModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Add Competitor Profile</h3>
            <form onSubmit={handleAddCompetitor} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LoanSettlement.in"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Domain *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. loansettlement.in"
                  value={newCompDomain}
                  onChange={(e) => setNewCompDomain(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Market Focus</label>
                <input
                  type="text"
                  placeholder="e.g. Credit card settlements, DRT notices"
                  value={newCompFocus}
                  onChange={(e) => setNewCompFocus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddCompetitorModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                >
                  Save Competitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Competitor Backlink Modal */}
      {showAddBacklinkModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Add Competitor Backlink</h3>
            <form onSubmit={handleAddBacklink} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Referring Domain *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. economicetimes.indiatimes.com"
                  value={newBacklink.referringDomain}
                  onChange={(e) => setNewBacklink({ ...newBacklink, referringDomain: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Referring URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newBacklink.referringUrl}
                  onChange={(e) => setNewBacklink({ ...newBacklink, referringUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Anchor Text Used</label>
                <input
                  type="text"
                  placeholder="e.g. debt relief options"
                  value={newBacklink.anchorText}
                  onChange={(e) => setNewBacklink({ ...newBacklink, anchorText: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Target Competitor URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://singledebt.in/services"
                  value={newBacklink.targetUrl}
                  onChange={(e) => setNewBacklink({ ...newBacklink, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBacklinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                >
                  Add Gap Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
