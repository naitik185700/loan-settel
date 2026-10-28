"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Plus,
  Search,
  Filter,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Send,
  Trash2,
  Info,
  ChevronRight,
  Sliders,
  HelpCircle,
} from "lucide-react";
import { computeProspectScore } from "@/lib/seo/scoring";

interface Prospect {
  id: string;
  domain: string;
  pageUrl: string;
  title: string;
  category: string;
  editorialGuidelines: string | null;
  topicalRelevance: number;
  editorialCredibility: number;
  audiencePotential: number;
  indianRelevance: number;
  editorialOpportunity: number;
  websiteQuality: number;
  priorityScore: number;
  contactName: string | null;
  contactEmail: string | null;
  contactUrl: string | null;
  estimatedEffort: string | null;
  riskIndicators: string | null;
  outreachStatus: string;
  notes: string | null;
  targetLandingPage: string | null;
  pitches: Array<{ id: string; angleType: string; status: string; sentAt: string | null }>;
}

const CATEGORIES = [
  "ALL",
  "Personal Finance",
  "Financial Literacy & Personal Finance",
  "Consumer Rights & Financial Awareness",
  "Legal Info",
  "Legal & Professional Finance",
  "MSME & Business",
  "Podcast & Media",
  "Gurugram Local",
];

const STATUSES = [
  "ALL",
  "DISCOVERED",
  "QUALIFIED",
  "PITCH_DRAFTED",
  "PITCH_APPROVED",
  "SENT",
  "REPLIED",
  "CONVERTED",
  "SUPPRESSED",
];

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProspectForScore, setSelectedProspectForScore] = useState<Prospect | null>(null);

  // New Prospect Form State
  const [formData, setFormData] = useState({
    domain: "",
    pageUrl: "",
    title: "",
    category: "Personal Finance",
    editorialGuidelines: "",
    topicalRelevance: 25,
    editorialCredibility: 15,
    audiencePotential: 12,
    indianRelevance: 8,
    editorialOpportunity: 10,
    websiteQuality: 8,
    contactName: "",
    contactEmail: "",
    contactUrl: "",
    estimatedEffort: "Medium",
    targetLandingPage: "/services/loan-settlement",
    notes: "",
  });

  const fetchProspects = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "ALL") params.set("category", selectedCategory);
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/admin/seo/prospects?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProspects(data.prospects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, [selectedCategory, selectedStatus, searchQuery]);

  const handleCreateProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/seo/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchProspects();
        // Reset form
        setFormData({
          domain: "",
          pageUrl: "",
          title: "",
          category: "Personal Finance",
          editorialGuidelines: "",
          topicalRelevance: 25,
          editorialCredibility: 15,
          audiencePotential: 12,
          indianRelevance: 8,
          editorialOpportunity: 10,
          websiteQuality: 8,
          contactName: "",
          contactEmail: "",
          contactUrl: "",
          estimatedEffort: "Medium",
          targetLandingPage: "/services/loan-settlement",
          notes: "",
        });
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create prospect");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating prospect");
    }
  };

  const handleDeleteProspect = async (id: string, domain: string) => {
    if (!confirm(`Are you sure you want to delete prospect ${domain}?`)) return;
    try {
      const res = await fetch(`/api/admin/seo/prospects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProspects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Preview computed score for new prospect modal
  const computedPreview = computeProspectScore({
    topicalRelevance: Number(formData.topicalRelevance),
    editorialCredibility: Number(formData.editorialCredibility),
    audiencePotential: Number(formData.audiencePotential),
    indianRelevance: Number(formData.indianRelevance),
    editorialOpportunity: Number(formData.editorialOpportunity),
    websiteQuality: Number(formData.websiteQuality),
  }, `${formData.domain} ${formData.notes}`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Backlink Prospects & Pipeline</h1>
            <span className="text-xs font-mono font-bold bg-brand-surface text-brand-navy px-2.5 py-0.5 rounded-full border border-brand-border">
              {prospects.length} Discovered
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Discover legitimate Indian publishers, evaluate editorial fit via our 100-point model, and prepare high-value pitches.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Prospect</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search domain, title, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-brand-muted">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-brand-border bg-white text-brand-navy focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-brand-muted">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-brand-border bg-white text-brand-navy focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Prospects Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : prospects.length === 0 ? (
          <div className="text-center p-12">
            <Target className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No prospects found</h3>
            <p className="text-xs text-brand-muted mt-1">Try adjusting your filters or add a new prospect.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Publisher / Domain</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Score (100pt)</th>
                  <th className="py-3 px-4">Target Landing Page</th>
                  <th className="py-3 px-4">Outreach Status</th>
                  <th className="py-3 px-4">Spam Risk</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {prospects.map((p) => {
                  const isClean = p.riskIndicators === "CLEAN" || !p.riskIndicators;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-brand-navy flex items-center gap-1.5">
                          <span>{p.title}</span>
                          <a
                            href={p.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-emerald"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <div className="text-[11px] font-mono text-brand-muted mt-0.5">
                          {p.domain}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedProspectForScore(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-105"
                          style={{
                            backgroundColor: p.priorityScore >= 80 ? "#ecfdf5" : p.priorityScore >= 60 ? "#eff6ff" : "#fffbeb",
                            color: p.priorityScore >= 80 ? "#065f46" : p.priorityScore >= 60 ? "#1e40af" : "#92400e",
                            border: `1px solid ${p.priorityScore >= 80 ? "#a7f3d0" : p.priorityScore >= 60 ? "#bfdbfe" : "#fde68a"}`,
                          }}
                        >
                          <span>{p.priorityScore}</span>
                          <Info className="w-3 h-3 opacity-60" />
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-mono text-brand-navy">
                          {p.targetLandingPage || "/services/loan-settlement"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.outreachStatus === "CONVERTED"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.outreachStatus === "PITCH_APPROVED"
                            ? "bg-purple-100 text-purple-800"
                            : p.outreachStatus === "SENT"
                            ? "bg-blue-100 text-blue-800"
                            : p.outreachStatus === "SUPPRESSED"
                            ? "bg-red-100 text-red-800"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {p.outreachStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {isClean ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Clean
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                            <AlertTriangle className="w-3.5 h-3.5" /> {p.riskIndicators}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/seo/outreach?prospectId=${p.id}`}
                            className="p-1.5 rounded-lg text-brand-emerald hover:bg-emerald-50 transition-colors"
                            title="Draft / View Pitch"
                          >
                            <Send className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProspect(p.id, p.domain)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete Prospect"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Score Breakdown Modal */}
      {selectedProspectForScore && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-brand-border space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-emerald tracking-wider">
                  Internal Editorial Scoring Model
                </span>
                <h3 className="text-lg font-bold text-brand-navy mt-0.5">
                  {selectedProspectForScore.title}
                </h3>
                <p className="text-xs text-brand-muted font-mono">{selectedProspectForScore.domain}</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-brand-emerald">
                  {selectedProspectForScore.priorityScore} / 100
                </div>
                <div className="text-[10px] text-slate-400">Total Score</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
              <strong>Evaluation Framework:</strong> This 100-point transparent score represents internal business and editorial priorities for Settle Loan Expert. It is <em>not</em> Google&apos;s ranking algorithm.
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Topical Relevance (Loan Settlement / Debt Relief)</span>
                  <span>{selectedProspectForScore.topicalRelevance} / 30</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.topicalRelevance / 30) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Editorial Credibility & Standards</span>
                  <span>{selectedProspectForScore.editorialCredibility} / 20</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.editorialCredibility / 20) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Audience & Referral Potential</span>
                  <span>{selectedProspectForScore.audiencePotential} / 15</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.audiencePotential / 15) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Indian Regulatory / Geographic Relevance</span>
                  <span>{selectedProspectForScore.indianRelevance} / 10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.indianRelevance / 10) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Genuine Editorial Opportunity</span>
                  <span>{selectedProspectForScore.editorialOpportunity} / 15</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.editorialOpportunity / 15) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-brand-navy mb-1">
                  <span>Website Quality & Spam Absence</span>
                  <span>{selectedProspectForScore.websiteQuality} / 10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-brand-emerald h-2 rounded-full" style={{ width: `${(selectedProspectForScore.websiteQuality / 10) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {selectedProspectForScore.editorialGuidelines && (
              <div className="pt-2">
                <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1">Editorial Guidelines</div>
                <p className="text-xs text-brand-muted leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  &ldquo;{selectedProspectForScore.editorialGuidelines}&rdquo;
                </p>
              </div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedProspectForScore(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Prospect Modal with Interactive Scoring */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-brand-border space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">Add New Backlink Prospect</h3>
                <p className="text-xs text-brand-muted">Calculate 100-pt white-hat opportunity score with automated spam verification.</p>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-brand-emerald">{computedPreview.totalScore} / 100</div>
                <span className="text-[10px] font-semibold text-brand-muted">{computedPreview.grade}</span>
              </div>
            </div>

            <form onSubmit={handleCreateProspect} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Domain *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. livemint.com"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Specific Page URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/personal-finance"
                    value={formData.pageUrl}
                    onChange={(e) => setFormData({ ...formData, pageUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Website / Publication Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Moneylife Consumer Division"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                  >
                    <option value="Personal Finance">Personal Finance</option>
                    <option value="Financial Literacy & Personal Finance">Financial Literacy & Personal Finance</option>
                    <option value="Consumer Rights & Financial Awareness">Consumer Rights & Financial Awareness</option>
                    <option value="Legal Info">Legal Info</option>
                    <option value="MSME & Business">MSME & Business</option>
                    <option value="Podcast & Media">Podcast & Media</option>
                    <option value="Gurugram Local">Gurugram Local</option>
                  </select>
                </div>
              </div>

              {/* Scoring Sliders */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>100-Point Transparent Evaluation Breakdown</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Topical Relevance:</span> <strong>{formData.topicalRelevance} / 30</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={formData.topicalRelevance}
                      onChange={(e) => setFormData({ ...formData, topicalRelevance: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Editorial Credibility:</span> <strong>{formData.editorialCredibility} / 20</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={formData.editorialCredibility}
                      onChange={(e) => setFormData({ ...formData, editorialCredibility: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Audience Potential:</span> <strong>{formData.audiencePotential} / 15</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={formData.audiencePotential}
                      onChange={(e) => setFormData({ ...formData, audiencePotential: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Indian Relevance:</span> <strong>{formData.indianRelevance} / 10</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.indianRelevance}
                      onChange={(e) => setFormData({ ...formData, indianRelevance: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Editorial Opportunity:</span> <strong>{formData.editorialOpportunity} / 15</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={formData.editorialOpportunity}
                      onChange={(e) => setFormData({ ...formData, editorialOpportunity: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between font-medium text-slate-700">
                      <span>Quality & Spam Absence:</span> <strong>{formData.websiteQuality} / 10</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.websiteQuality}
                      onChange={(e) => setFormData({ ...formData, websiteQuality: Number(e.target.value) })}
                      className="w-full accent-brand-emerald"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Target SLE Landing Page</label>
                  <select
                    value={formData.targetLandingPage}
                    onChange={(e) => setFormData({ ...formData, targetLandingPage: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                  >
                    <option value="/services/loan-settlement">/services/loan-settlement</option>
                    <option value="/services/credit-card-debt-settlement">/services/credit-card-debt-settlement</option>
                    <option value="/services/personal-loan-settlement">/services/personal-loan-settlement</option>
                    <option value="/services/business-loan-assistance">/services/business-loan-assistance</option>
                    <option value="/blog/rbi-fair-practices-code-borrower-rights">/blog/rbi-fair-practices-code-borrower-rights</option>
                    <option value="/blog/understanding-loan-settlement-in-india-guide">/blog/understanding-loan-settlement-in-india-guide</option>
                    <option value="/blog/rebuilding-cibil-score-post-settlement">/blog/rebuilding-cibil-score-post-settlement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Contact Email / Editor Contact</label>
                  <input
                    type="email"
                    placeholder="editor@publication.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Editorial Guidelines / Pitch Angle Notes</label>
                <textarea
                  rows={2}
                  placeholder="Note editorial standards, guidelines, or specific borrower rights angle..."
                  value={formData.editorialGuidelines}
                  onChange={(e) => setFormData({ ...formData, editorialGuidelines: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors shadow-sm"
                >
                  Save & Qualify Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
