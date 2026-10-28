"use client";

import React, { useState, useEffect } from "react";
import {
  Link2,
  RefreshCw,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  History,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

interface CheckLog {
  id: string;
  checkedAt: string;
  httpStatus: number;
  anchorFound: string | null;
  relFound: string | null;
  isFound: boolean;
  responseTimeMs: number | null;
  rawDetails: string | null;
}

interface MonitoredBacklink {
  id: string;
  referringUrl: string;
  targetUrl: string;
  anchorText: string | null;
  relAttribute: string;
  httpStatus: number;
  isLive: boolean;
  toxicityScore: number;
  toxicityReason: string | null;
  isDisavowed: boolean;
  lastCheckedAt: string | null;
  errorCount: number;
  prospect?: { title: string; domain: string; category: string } | null;
  checkLogs: CheckLog[];
}

export default function MonitoringPage() {
  const [backlinks, setBacklinks] = useState<MonitoredBacklink[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingId, setCheckingId] = useState<string | null>(null);
  const [checkingAll, setCheckingAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLogsBacklink, setSelectedLogsBacklink] = useState<MonitoredBacklink | null>(null);

  // Form State
  const [referringUrl, setReferringUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://settleloanexpert.in");
  const [anchorText, setAnchorText] = useState("");
  const [relAttribute, setRelAttribute] = useState("follow");

  const fetchBacklinks = async () => {
    try {
      const res = await fetch("/api/admin/seo/monitoring");
      if (res.ok) {
        const data = await res.json();
        setBacklinks(data.backlinks || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBacklinks();
  }, []);

  const handleCheckNow = async (id: string) => {
    setCheckingId(id);
    try {
      const res = await fetch("/api/admin/seo/monitoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check-now", id }),
      });

      if (res.ok) {
        fetchBacklinks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingId(null);
    }
  };

  const handleCheckAll = async () => {
    setCheckingAll(true);
    try {
      const res = await fetch("/api/admin/seo/monitoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check-all" }),
      });

      if (res.ok) {
        fetchBacklinks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingAll(false);
    }
  };

  const handleAddBacklink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/monitoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          referringUrl,
          targetUrl,
          anchorText,
          relAttribute,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setReferringUrl("");
        setAnchorText("");
        fetchBacklinks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const liveCount = backlinks.filter((b) => b.isLive && !b.isDisavowed).length;
  const lostCount = backlinks.filter((b) => !b.isLive && !b.isDisavowed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Backlink Verification & Monitor</h1>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Link Bot
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Polite automated crawler inspecting referring pages, checking HTTP statuses, anchor texts, and rel tags (follow/nofollow).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCheckAll}
            disabled={checkingAll || backlinks.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-brand-border text-brand-navy hover:bg-slate-50 shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checkingAll ? "animate-spin text-brand-emerald" : ""}`} />
            <span>Check All Active ({backlinks.length})</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Track New Link</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Active Live Links</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">{liveCount}</div>
          <div className="text-xs text-brand-muted mt-1">Confirmed pointing to settleloanexpert.in</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Broken / Lost Backlinks</div>
          <div className="text-3xl font-bold text-red-500 mt-2">{lostCount}</div>
          <div className="text-xs text-brand-muted mt-1">Target link missing from referring page</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Monitored Portfolio</div>
          <div className="text-3xl font-bold text-brand-navy mt-2">{backlinks.length}</div>
          <div className="text-xs text-brand-muted mt-1">Total active referring URLs tracked</div>
        </div>
      </div>

      {/* Backlinks Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : backlinks.length === 0 ? (
          <div className="text-center p-12">
            <Link2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No monitored backlinks tracked</h3>
            <p className="text-xs text-brand-muted mt-1">Add a live referring URL to monitor status and anchor tags.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Referring Page URL</th>
                  <th className="py-3 px-4">Detected Anchor Text</th>
                  <th className="py-3 px-4">Rel Tag</th>
                  <th className="py-3 px-4">HTTP Status</th>
                  <th className="py-3 px-4">Live State</th>
                  <th className="py-3 px-4">Last Checked</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {backlinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-semibold text-brand-navy flex items-center gap-1.5 truncate">
                        <span className="truncate">{link.referringUrl}</span>
                        <a
                          href={link.referringUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-emerald shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                        &rarr; {link.targetUrl}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-brand-navy">
                      &ldquo;{link.anchorText || "[Image / Icon Link]"}&rdquo;
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        link.relAttribute.includes("follow") && !link.relAttribute.includes("nofollow")
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        rel=&ldquo;{link.relAttribute}&rdquo;
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-xs font-semibold ${
                        link.httpStatus === 200 ? "text-emerald-600" : "text-red-500"
                      }`}>
                        {link.httpStatus || "ERR"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {link.isLive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-500">
                          <AlertTriangle className="w-3.5 h-3.5" /> Not Found
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {link.lastCheckedAt ? new Date(link.lastCheckedAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }) : "Never"}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCheckNow(link.id)}
                          disabled={checkingId === link.id}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors disabled:opacity-50"
                          title="Run Live Check Now"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 inline ${checkingId === link.id ? "animate-spin text-brand-emerald" : ""}`} />
                          <span className="ml-1 hidden sm:inline">Verify</span>
                        </button>

                        <button
                          onClick={() => setSelectedLogsBacklink(link)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition-colors"
                          title="View Check History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Crawl History Logs Modal */}
      {selectedLogsBacklink && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-brand-navy">Crawl Verification History</h3>
                <p className="text-xs text-brand-muted truncate max-w-sm font-mono mt-0.5">
                  {selectedLogsBacklink.referringUrl}
                </p>
              </div>
              <button
                onClick={() => setSelectedLogsBacklink(null)}
                className="text-slate-400 hover:text-brand-navy text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {selectedLogsBacklink.checkLogs.length === 0 ? (
                <div className="text-center py-6 text-xs text-brand-muted">No check logs recorded yet.</div>
              ) : (
                selectedLogsBacklink.checkLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${log.isFound ? "text-emerald-600" : "text-red-500"}`}>
                          HTTP {log.httpStatus} • {log.isFound ? "LINK FOUND" : "LINK MISSING"}
                        </span>
                        {log.responseTimeMs && (
                          <span className="text-[10px] text-slate-400 font-mono">({log.responseTimeMs}ms)</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Anchor: &ldquo;{log.anchorFound || 'N/A'}&rdquo; • rel: {log.relFound || 'follow'}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(log.checkedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLogsBacklink(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Backlink Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Track New Live Backlink</h3>
            <form onSubmit={handleAddBacklink} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Referring Page URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://moneylife.in/article/..."
                  value={referringUrl}
                  onChange={(e) => setReferringUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Target SLE URL *</label>
                <input
                  type="url"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Expected Anchor Text</label>
                <input
                  type="text"
                  placeholder="e.g. Settle Loan Expert"
                  value={anchorText}
                  onChange={(e) => setAnchorText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Expected Rel Tag</label>
                <select
                  value={relAttribute}
                  onChange={(e) => setRelAttribute(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                >
                  <option value="follow">follow (Do-Follow Editorial)</option>
                  <option value="nofollow">nofollow</option>
                  <option value="ugc">ugc (User Generated Content)</option>
                  <option value="sponsored">sponsored</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                >
                  Verify & Track Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
