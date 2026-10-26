"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  X,
  Clock,
  AlertCircle,
  Save,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>({ total: 0, totalPages: 1 });
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/leads", window.location.origin);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", "15");
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setPagination(data.pagination || { total: 0, totalPages: 1 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const handleOpenLead = (lead: any) => {
    setSelectedLead(lead);
    setUpdateStatus(lead.status);
    setFollowUpDate(
      lead.followUpDate
        ? new Date(lead.followUpDate).toISOString().split("T")[0]
        : ""
    );
    setNewNote("");
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: updateStatus,
          followUpDate: followUpDate || null,
          note: newNote,
        }),
      });

      if (res.ok) {
        // Refresh leads list and update selected lead
        await fetchLeads();
        const updatedRes = await fetch(`/api/leads/${selectedLead.id}`);
        if (updatedRes.ok) {
          const freshLead = await updatedRes.json();
          setSelectedLead(freshLead);
          setNewNote("");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedLead(null);
        fetchLeads();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Leads & Enquiry Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            View, track, and update consumer enquiries and consultation requests
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-brand-mint text-brand-emerald rounded-lg border border-brand-border self-start sm:self-auto">
          Total Leads: {pagination.total}
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-20 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1 bg-brand-navy text-white text-xs font-semibold rounded-lg hover:bg-brand-navy-dark"
          >
            Search
          </button>
        </form>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-brand-navy shrink-0">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="text-xs border border-brand-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New (Uncontacted)</option>
            <option value="CONTACTED">Contacted</option>
            <option value="FOLLOW_UP">Follow-up Scheduled</option>
            <option value="IN_PROGRESS">In Active Negotiation</option>
            <option value="CONVERTED">Converted / Settled</option>
            <option value="CLOSED">Closed / Ineligible</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Debt Type</th>
                <th className="py-3.5 px-4">Estimated Balance</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-emerald mx-auto"></div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No enquiries match the current filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-brand-mint/40 transition-colors cursor-pointer"
                    onClick={() => handleOpenLead(lead)}
                  >
                    <td className="py-3.5 px-4 font-bold text-brand-navy">
                      {lead.fullName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      <div>{lead.mobile}</div>
                      {lead.email && (
                        <div className="text-[10px] text-slate-400 font-sans">
                          {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                        {lead.loanCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {lead.outstandingAmount || "Not specified"}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-400">
                      {lead.source}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          lead.status === "NEW"
                            ? "bg-amber-100 text-amber-800"
                            : lead.status === "CONTACTED"
                            ? "bg-blue-100 text-blue-800"
                            : lead.status === "FOLLOW_UP"
                            ? "bg-purple-100 text-purple-800"
                            : lead.status === "IN_PROGRESS"
                            ? "bg-indigo-100 text-indigo-800"
                            : lead.status === "CONVERTED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLead(lead);
                        }}
                        className="px-2.5 py-1 bg-brand-surface hover:bg-brand-mint text-brand-navy font-semibold text-[11px] rounded-lg border border-brand-border"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
          <div>
            Showing Page <span className="font-bold text-brand-navy">{page}</span> of{" "}
            <span className="font-bold text-brand-navy">{pagination.totalPages || 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg border border-brand-border bg-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-brand-border bg-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-brand-navy-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-emerald-light uppercase tracking-wider font-mono">
                  Enquiry ID: {selectedLead.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedLead.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border">
                  <div className="text-slate-400">Mobile Phone</div>
                  <a
                    href={`tel:${selectedLead.mobile}`}
                    className="font-bold text-brand-navy hover:text-brand-emerald text-sm flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                    {selectedLead.mobile}
                  </a>
                </div>

                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border">
                  <div className="text-slate-400">Email Address</div>
                  <div className="font-semibold text-brand-navy truncate mt-0.5">
                    {selectedLead.email || "None provided"}
                  </div>
                </div>

                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border">
                  <div className="text-slate-400">Loan Category</div>
                  <div className="font-bold text-brand-navy mt-0.5">
                    {selectedLead.loanCategory}
                  </div>
                </div>

                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border">
                  <div className="text-slate-400">Outstanding Debt</div>
                  <div className="font-bold text-brand-navy mt-0.5">
                    {selectedLead.outstandingAmount || "Not specified"}
                  </div>
                </div>
              </div>

              {/* Situation Summary */}
              {selectedLead.description && (
                <div className="p-4 bg-slate-50 rounded-xl border border-brand-border text-xs space-y-1">
                  <div className="font-bold text-brand-navy">Client Situation Description:</div>
                  <p className="text-brand-text leading-relaxed">
                    {selectedLead.description}
                  </p>
                </div>
              )}

              {/* Status Update Form */}
              <div className="p-4 bg-brand-mint/40 rounded-xl border border-brand-border space-y-4">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Update Lead Status & Follow-up
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Lead Status
                    </label>
                    <select
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="FOLLOW_UP">Follow-up</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="CONVERTED">Converted</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Next Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Add Internal Case Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Document discussion with client, bank settlement terms proposed, or follow-up notes..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <button
                  onClick={handleSaveLeadDetails}
                  disabled={saving}
                  className="px-4 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Updating..." : "Save Updates"}
                </button>
              </div>

              {/* Case History / Notes Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-emerald" />
                  Case History & Notes ({selectedLead.notes?.length || 0})
                </h4>

                <div className="space-y-2">
                  {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
                  ) : (
                    selectedLead.notes.map((note: any) => (
                      <div
                        key={note.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="font-semibold text-brand-navy">
                            {note.authorName}
                          </span>
                          <span>
                            {new Date(note.createdAt).toLocaleString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-brand-text leading-relaxed">
                          {note.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-brand-border flex items-center justify-between">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Enquiry
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-brand-navy font-semibold text-xs rounded-lg"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
