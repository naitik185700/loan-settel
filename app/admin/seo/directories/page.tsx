"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Edit,
  MapPin,
  Phone,
} from "lucide-react";

interface DirectoryListing {
  id: string;
  name: string;
  directoryUrl: string;
  category: string;
  listingUrl: string | null;
  status: string;
  isPaid: boolean;
  pricing: string | null;
  napConsistent: boolean;
  backlinkVerified: boolean;
  relAttribute: string | null;
  submissionNotes: string | null;
  lastChecked: string | null;
}

export default function DirectoriesPage() {
  const [directories, setDirectories] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryListing | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [directoryUrl, setDirectoryUrl] = useState("");
  const [category, setCategory] = useState("Gurugram Local");
  const [listingUrl, setListingUrl] = useState("");
  const [status, setStatus] = useState("DISCOVERED");
  const [isPaid, setIsPaid] = useState(false);
  const [pricing, setPricing] = useState("Free Listing");
  const [submissionNotes, setSubmissionNotes] = useState("");

  const fetchDirectories = async () => {
    try {
      const res = await fetch("/api/admin/seo/directories");
      if (res.ok) {
        const data = await res.json();
        setDirectories(data.directories || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  const handleCreateDirectory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/directories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          directoryUrl,
          category,
          listingUrl: listingUrl || null,
          status,
          isPaid,
          pricing,
          submissionNotes,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setName("");
        setDirectoryUrl("");
        setListingUrl("");
        setSubmissionNotes("");
        fetchDirectories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string, backlinkVerified?: boolean) => {
    try {
      const res = await fetch("/api/admin/seo/directories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          ...(backlinkVerified !== undefined ? { backlinkVerified } : {}),
        }),
      });

      if (res.ok) {
        fetchDirectories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Gurugram & National Business Citations</h1>
          <p className="text-sm text-brand-muted mt-1">
            Track legitimate, curated Indian business directories with strict Name, Address, Phone (NAP) consistency for Gurugram, Haryana.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Directory</span>
        </button>
      </div>

      {/* NAP Standard Banner */}
      <div className="bg-brand-surface p-4 rounded-2xl border border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white border border-brand-border text-brand-emerald">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-navy">Canonical NAP Verification Target</div>
            <div className="text-xs text-brand-muted flex flex-wrap items-center gap-4 mt-0.5">
              <span className="font-semibold text-brand-navy">Settle Loan Expert</span>
              <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-emerald" /> Gurugram, Haryana, India</span>
              <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3 text-brand-emerald" /> +91 92892 20888</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-brand-muted">
          NAP Match: <strong className="text-emerald-600">100% Consistent</strong>
        </div>
      </div>

      {/* Directories List */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : directories.length === 0 ? (
          <div className="text-center p-12">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No directory citations recorded</h3>
            <p className="text-xs text-brand-muted mt-1">Add your first directory submission above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Directory Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">NAP Status</th>
                  <th className="py-3 px-4">Listing Status</th>
                  <th className="py-3 px-4">Backlink & Tag</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {directories.map((dir) => (
                  <tr key={dir.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-brand-navy flex items-center gap-1.5">
                        <span>{dir.name}</span>
                        {dir.listingUrl ? (
                          <a
                            href={dir.listingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-emerald hover:underline"
                            title="Open live listing"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <a
                            href={dir.directoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-navy"
                            title="Open directory portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {dir.submissionNotes || dir.directoryUrl}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {dir.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {dir.napConsistent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                          <AlertTriangle className="w-3.5 h-3.5" /> Needs Review
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={dir.status}
                        onChange={(e) => handleUpdateStatus(dir.id, e.target.value)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border focus:outline-none ${
                          dir.status === "LIVE"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : dir.status === "APPROVED"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : dir.status === "SUBMITTED"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="DISCOVERED">DISCOVERED</option>
                        <option value="IN_REVIEW">IN_REVIEW</option>
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="LIVE">LIVE</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4">
                      {dir.backlinkVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>rel=&ldquo;{dir.relAttribute || 'nofollow'}&rdquo;</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Pending verification</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-brand-navy">
                        {dir.pricing || (dir.isPaid ? "Paid Listing" : "Free Listing")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {dir.status === "APPROVED" && !dir.backlinkVerified && (
                        <button
                          onClick={() => handleUpdateStatus(dir.id, "LIVE", true)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          Mark Live & Verified
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Directory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Add Business Directory</h3>
            <form onSubmit={handleCreateDirectory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Directory Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yellow Pages Gurgaon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Directory Portal URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={directoryUrl}
                  onChange={(e) => setDirectoryUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                >
                  <option value="Gurugram Local">Gurugram Local</option>
                  <option value="National Business">National Business</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="MSME Portal">MSME Portal</option>
                  <option value="Legal & Taxation">Legal & Taxation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Our Listing URL (if live)</label>
                <input
                  type="url"
                  placeholder="https://directory.com/settle-loan-expert"
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Submission / Verification Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. OTP verification sent to +91 92892 20888..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
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
                  Save Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
