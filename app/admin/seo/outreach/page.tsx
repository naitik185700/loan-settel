"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Copy,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { INITIAL_PITCH_TEMPLATES } from "@/lib/seo/seeds";

interface OutreachPitch {
  id: string;
  prospectId: string;
  angleType: string;
  pitchSubject: string;
  pitchBody: string;
  targetAssetUrl: string;
  status: string;
  approvedBy: string | null;
  sentAt: string | null;
  followUpDate: string | null;
  responseNotes: string | null;
  prospect: {
    domain: string;
    title: string;
    category: string;
    contactEmail: string | null;
    contactName: string | null;
  };
}

export default function OutreachPage() {
  const [pitches, setPitches] = useState<OutreachPitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState<OutreachPitch | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Draft State
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [prospectsList, setProspectsList] = useState<Array<{ id: string; domain: string; title: string }>>([]);
  const [targetProspectId, setTargetProspectId] = useState("");
  const [customSubject, setCustomSubject] = useState(INITIAL_PITCH_TEMPLATES[0].pitchSubject);
  const [customBody, setCustomBody] = useState(INITIAL_PITCH_TEMPLATES[0].pitchBody);
  const [targetUrl, setTargetUrl] = useState(INITIAL_PITCH_TEMPLATES[0].targetAssetUrl);

  const fetchPitches = async () => {
    try {
      const res = await fetch("/api/admin/seo/outreach");
      if (res.ok) {
        const data = await res.json();
        setPitches(data.pitches || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProspectsDropdown = async () => {
    try {
      const res = await fetch("/api/admin/seo/prospects");
      if (res.ok) {
        const data = await res.json();
        setProspectsList(data.prospects || []);
        if (data.prospects?.length > 0 && !targetProspectId) {
          setTargetProspectId(data.prospects[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPitches();
    fetchProspectsDropdown();
  }, []);

  const handleTemplateSelect = (idx: number) => {
    setSelectedTemplateIndex(idx);
    const tmpl = INITIAL_PITCH_TEMPLATES[idx];
    setCustomSubject(tmpl.pitchSubject);
    setCustomBody(tmpl.pitchBody);
    setTargetUrl(tmpl.targetAssetUrl);
  };

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tmpl = INITIAL_PITCH_TEMPLATES[selectedTemplateIndex];
      const res = await fetch("/api/admin/seo/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospectId: targetProspectId,
          angleType: tmpl.angleType,
          pitchSubject: customSubject,
          pitchBody: customBody,
          targetAssetUrl: targetUrl,
        }),
      });

      if (res.ok) {
        setShowDraftModal(false);
        fetchPitches();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePitchAction = async (id: string, action: string, responseNotes?: string) => {
    try {
      const res = await fetch("/api/admin/seo/outreach", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, responseNotes }),
      });

      if (res.ok) {
        fetchPitches();
        if (selectedPitch && selectedPitch.id === id) {
          setSelectedPitch(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">Editorial Outreach CRM</h1>
            <span className="text-[11px] font-semibold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
              Admin Approval Required
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Personalized pitches, editorial compliance checks, review gates, and publisher relationship tracking.
          </p>
        </div>

        <button
          onClick={() => setShowDraftModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Draft Editorial Pitch</span>
        </button>
      </div>

      {/* Pitches Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
          </div>
        ) : pitches.length === 0 ? (
          <div className="text-center p-12">
            <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-brand-navy">No pitches drafted yet</h3>
            <p className="text-xs text-brand-muted mt-1">Draft a pitch using one of our verified educational templates.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Publisher / Contact</th>
                  <th className="py-3 px-4">Angle & Subject</th>
                  <th className="py-3 px-4">Promoted Asset URL</th>
                  <th className="py-3 px-4">Review & Approval Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {pitches.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-brand-navy">{p.prospect.title}</div>
                      <div className="text-[11px] font-mono text-brand-muted">{p.prospect.domain}</div>
                      {p.prospect.contactEmail && (
                        <div className="text-[11px] text-brand-emerald">{p.prospect.contactEmail}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-brand-navy truncate">{p.pitchSubject}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Angle: {p.angleType}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={p.targetAssetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-brand-navy hover:text-brand-emerald hover:underline inline-flex items-center gap-1"
                      >
                        <span className="truncate max-w-xs">{new URL(p.targetAssetUrl).pathname}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "APPROVED"
                          ? "bg-purple-100 text-purple-800"
                          : p.status === "SENT"
                          ? "bg-blue-100 text-blue-800"
                          : p.status === "REPLIED"
                          ? "bg-teal-100 text-teal-800"
                          : p.status === "ACCEPTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : p.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {p.status}
                      </span>
                      {p.approvedBy && (
                        <div className="text-[10px] text-slate-400 mt-1">By: {p.approvedBy}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPitch(p)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                        >
                          Review Pitch
                        </button>

                        {p.status === "DRAFT" && (
                          <button
                            onClick={() => handlePitchAction(p.id, "approve")}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                          >
                            Approve
                          </button>
                        )}

                        {p.status === "APPROVED" && (
                          <button
                            onClick={() => handlePitchAction(p.id, "mark-sent")}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            Mark Sent
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Pitch Drawer / Modal */}
      {selectedPitch && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-brand-border space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-emerald tracking-wider">
                  Outreach Pitch Review
                </span>
                <h3 className="text-base font-bold text-brand-navy mt-0.5">{selectedPitch.prospect.title}</h3>
                <p className="text-xs text-brand-muted font-mono">{selectedPitch.prospect.contactEmail || selectedPitch.prospect.domain}</p>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {selectedPitch.status}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-brand-navy mb-1 flex items-center justify-between">
                <span>Subject Line:</span>
                <button
                  onClick={() => copyToClipboard(selectedPitch.pitchSubject, "subject")}
                  className="text-brand-emerald hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedId === "subject" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-brand-navy">
                {selectedPitch.pitchSubject}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-brand-navy mb-1 flex items-center justify-between">
                <span>Pitch Body:</span>
                <button
                  onClick={() => copyToClipboard(selectedPitch.pitchBody, "body")}
                  className="text-brand-emerald hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedId === "body" ? "Copied!" : "Copy Body"}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {selectedPitch.pitchBody}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPitch(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedPitch.status === "DRAFT" && (
                  <button
                    onClick={() => handlePitchAction(selectedPitch.id, "approve")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors"
                  >
                    Approve Pitch
                  </button>
                )}
                {selectedPitch.status === "APPROVED" && (
                  <button
                    onClick={() => handlePitchAction(selectedPitch.id, "mark-sent")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Mark as Sent
                  </button>
                )}
                {selectedPitch.status === "SENT" && (
                  <button
                    onClick={() => handlePitchAction(selectedPitch.id, "record-response", "Editor responded with review interest.")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                  >
                    Record Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Pitch Draft Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-brand-border space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-brand-navy">Draft Editorial Pitch</h3>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">Choose Content Asset Angle</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INITIAL_PITCH_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={tmpl.angleType}
                    type="button"
                    onClick={() => handleTemplateSelect(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTemplateIndex === idx
                        ? "border-brand-emerald bg-brand-surface text-brand-navy shadow-sm"
                        : "border-brand-border hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="text-[11px] font-bold text-brand-emerald uppercase tracking-wider">{tmpl.angleType}</div>
                    <div className="text-xs font-semibold mt-1 line-clamp-2">{tmpl.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Target Publisher Prospect *</label>
                <select
                  required
                  value={targetProspectId}
                  onChange={(e) => setTargetProspectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald bg-white"
                >
                  {prospectsList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.domain})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Subject Line *</label>
                <input
                  type="text"
                  required
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Promoted Landing Page URL *</label>
                <input
                  type="url"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Pitch Body Content *</label>
                <textarea
                  rows={8}
                  required
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDraftModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-brand-navy hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors shadow-sm"
                >
                  Save Draft for Admin Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
