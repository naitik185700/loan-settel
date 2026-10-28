"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Download,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Info,
  ExternalLink,
} from "lucide-react";

interface ToxicEntry {
  referringUrl: string;
  domain: string;
  toxicityScore: number;
  reason: string;
  isDomainLevel: boolean;
}

export default function DisavowPage() {
  const [entries, setEntries] = useState<ToxicEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [referringUrl, setReferringUrl] = useState("");
  const [reason, setReason] = useState("Automated scraper or link farm footprint");
  const [toxicityScore, setToxicityScore] = useState(85);

  const fetchDisavowList = async () => {
    try {
      const res = await fetch("/api/admin/seo/disavow");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisavowList();
  }, []);

  const handleAddToxic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create monitored backlink flagged as disavowed
      const res = await fetch("/api/admin/seo/monitoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          referringUrl,
          targetUrl: "https://settleloanexpert.in",
        }),
      });

      if (res.ok) {
        const created = await res.json();
        // Immediately toggle disavow
        await fetch("/api/admin/seo/monitoring", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "toggle-disavow",
            id: created.backlink.id,
            isDisavowed: true,
            toxicityReason: reason,
            toxicityScore,
          }),
        });

        setShowAddModal(false);
        setReferringUrl("");
        fetchDisavowList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadDisavowTxt = () => {
    window.open("/api/admin/seo/disavow?format=txt", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Toxicity Audit & Google Disavow Generator</h1>
            <span className="text-[11px] font-semibold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
              Spam Neutralizer
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Isolate toxic backlinks, scrape footprints, or malicious links and generate Google Search Central-compliant disavow files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-brand-border text-brand-navy hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-emerald" />
            <span>Add Toxic URL</span>
          </button>
          <button
            onClick={handleDownloadDisavowTxt}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download disavow.txt</span>
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Important Google Search Central Guidance:</strong> Only use the disavow tool if you believe you have a considerable number of spammy, artificial, or low-quality links pointing to your site, or if the links have caused a manual action. Most natural low-quality links are handled automatically by Google algorithms.
        </div>
      </div>

      {/* Disavowed List Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center p-12">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">Zero Toxic Links Quarantined</h3>
            <p className="text-xs text-brand-muted mt-1">
              Your backlink profile is clean. If you spot scraper sites or link farms, add them above to quarantine.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Referring Target</th>
                  <th className="py-3 px-4">Disavow Directive</th>
                  <th className="py-3 px-4">Toxicity Score</th>
                  <th className="py-3 px-4">Reason for Quarantine</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {entries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-brand-navy">
                      <div className="font-semibold truncate max-w-sm">{entry.referringUrl}</div>
                      <div className="text-[11px] text-slate-400">{entry.domain}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {entry.isDomainLevel ? `domain:${entry.domain}` : entry.referringUrl}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                        {entry.toxicityScore} / 100
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {entry.reason}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[11px] font-semibold text-rose-600">
                        Quarantined
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Toxic URL Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Quarantine Toxic Link</h3>
            <form onSubmit={handleAddToxic} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Spam / Scraper URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://spamsite.xyz/unnatural-links"
                  value={referringUrl}
                  onChange={(e) => setReferringUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Toxicity Score (0 - 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={toxicityScore}
                  onChange={(e) => setToxicityScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Reason for Toxicity</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                >
                  <option value="Automated scraper or link farm footprint">Automated scraper or link farm footprint</option>
                  <option value="Casino, crypto, or gambling anchor text injection">Casino, crypto, or gambling anchor injection</option>
                  <option value="Unnatural exact-match commercial sitewide link">Unnatural sitewide link network</option>
                  <option value="Negative SEO spam attempt">Negative SEO spam attempt</option>
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
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Add to Disavow List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
