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
  Download,
  Plus,
  RefreshCw,
  ExternalLink,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>({ total: 0, totalPages: 1 });
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    loanCategory: "Personal Loan",
    outstandingAmount: "₹2 Lakhs - ₹5 Lakhs",
    preferredTime: "Any time (10 AM - 7 PM)",
    description: "",
    initialNote: "",
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/leads", window.location.origin);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", "15");
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (paymentStatusFilter !== "ALL") url.searchParams.set("paymentStatus", paymentStatusFilter);
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
  }, [page, statusFilter, paymentStatusFilter]);

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

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);

    const cleanMobile = newLeadForm.mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setAddError("Please provide a valid 10-digit mobile number");
      setAddLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newLeadForm.fullName,
          mobile: cleanMobile,
          email: newLeadForm.email || undefined,
          loanCategory: newLeadForm.loanCategory,
          outstandingAmount: newLeadForm.outstandingAmount,
          preferredTime: newLeadForm.preferredTime,
          description: newLeadForm.description,
          note: newLeadForm.initialNote,
          source: "admin_manual",
          consentGiven: true,
          status: "NEW",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create lead");
      }

      setIsAddModalOpen(false);
      setNewLeadForm({
        fullName: "",
        mobile: "",
        email: "",
        loanCategory: "Personal Loan",
        outstandingAmount: "₹2 Lakhs - ₹5 Lakhs",
        preferredTime: "Any time (10 AM - 7 PM)",
        description: "",
        initialNote: "",
      });
      fetchLeads();
    } catch (err: any) {
      setAddError(err.message || "Failed to create enquiry");
    } finally {
      setAddLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export under current filters.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Mobile",
      "Email",
      "Loan Category",
      "Outstanding Amount",
      "Status",
      "Payment Status",
      "Amount Paid",
      "Source",
      "Created At",
      "Preferred Time",
      "Description",
    ];

    const rows = leads.map((lead) => [
      `"${lead.id}"`,
      `"${(lead.fullName || "").replace(/"/g, '""')}"`,
      `"${lead.mobile}"`,
      `"${lead.email || ""}"`,
      `"${lead.loanCategory || ""}"`,
      `"${lead.outstandingAmount || ""}"`,
      `"${lead.status}"`,
      `"${lead.paymentStatus}"`,
      `"${lead.paymentAmount || 0}"`,
      `"${lead.source}"`,
      `"${new Date(lead.createdAt).toISOString()}"`,
      `"${lead.preferredTime || ""}"`,
      `"${(lead.description || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `settle_loan_expert_leads_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for WhatsApp click
  const getWhatsAppUrl = (mobile: string, name: string) => {
    const clean = mobile.replace(/\D/g, "").slice(-10);
    const msg = encodeURIComponent(
      `Hello ${name}, this is from Settle Loan Expert regarding your confidential loan settlement and debt relief enquiry. Are you available for a brief discussion?`
    );
    return `https://wa.me/91${clean}?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Leads &amp; Enquiry Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Real-time borrower enquiries, debt profiles, and consultation pipelines
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-brand-border text-xs font-semibold text-brand-navy rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-brand-border text-xs font-semibold text-brand-navy rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-brand-emerald" />
            Export CSV
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Manual Enquiry
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by client name, mobile (+91), or email..."
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

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
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

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-navy shrink-0">
              Payment:
            </span>
            <select
              value={paymentStatusFilter}
              onChange={(e) => {
                setPaymentStatusFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs border border-brand-border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            >
              <option value="ALL">All Payments</option>
              <option value="PAID">Paid Priority Leads (₹499)</option>
              <option value="UNPAID">Free Queries (Unpaid)</option>
              <option value="PENDING">Payment Pending</option>
            </select>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 bg-brand-mint text-brand-emerald rounded-xl border border-brand-border shrink-0">
            Total: {pagination.total}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Mobile &amp; Quick Contact</th>
                <th className="py-3.5 px-4">Debt Type</th>
                <th className="py-3.5 px-4">Estimated Balance</th>
                <th className="py-3.5 px-4">Priority / Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-emerald mx-auto"></div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No enquiries found. All submissions via the website form will appear here in real time.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-brand-mint/30 transition-colors cursor-pointer"
                    onClick={() => handleOpenLead(lead)}
                  >
                    <td className="py-3.5 px-4 font-bold text-brand-navy">
                      <div className="flex items-center gap-1.5">
                        {lead.status === "NEW" && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        )}
                        <span>{lead.fullName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-800 font-medium">
                        {lead.mobile}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${lead.mobile}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-brand-emerald transition-colors inline-flex items-center gap-1 text-[10px]"
                          title="Call Client"
                        >
                          <Phone className="w-3 h-3 text-brand-emerald" />
                          <span>Call</span>
                        </a>
                        <a
                          href={getWhatsAppUrl(lead.mobile, lead.fullName)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-brand-emerald font-semibold transition-colors inline-flex items-center gap-1 text-[10px]"
                          title="WhatsApp Chat"
                        >
                          <span>WhatsApp</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium text-[11px]">
                        {lead.loanCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {lead.outstandingAmount || "Not specified"}
                    </td>
                    <td className="py-3.5 px-4">
                      {lead.paymentStatus === "PAID" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                          ₹{lead.paymentAmount || 499} Priority
                        </span>
                      ) : lead.paymentStatus === "PENDING" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-[10px] bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-[10px] bg-slate-100 text-slate-600">
                          Free Enquiry
                        </span>
                      )}
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
                    <td className="py-3.5 px-4 text-[11px] text-slate-400">
                      {lead.source}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
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
                        Manage
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
            <span className="font-bold text-brand-navy">{pagination.totalPages || 1}</span> ({pagination.total} total)
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

      {/* Manual Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden">
            <div className="bg-brand-navy p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-white">
                  Add New Case Enquiry Manually
                </h3>
                <p className="text-xs text-slate-300">
                  Record a direct phone call, walk-in, or offline referral
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="p-6 space-y-4">
              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{addError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Sharma"
                    value={newLeadForm.fullName}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={newLeadForm.mobile}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        mobile: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={newLeadForm.email}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Debt Category *
                  </label>
                  <select
                    value={newLeadForm.loanCategory}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        loanCategory: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Credit Card Debt">Credit Card Debt</option>
                    <option value="Business Loan">Business / MSME Loan</option>
                    <option value="Multiple Loans / Mixed">Multiple Loans &amp; Cards</option>
                    <option value="Other">Other Debt</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Estimated Outstanding Debt
                  </label>
                  <select
                    value={newLeadForm.outstandingAmount}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        outstandingAmount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="Below ₹1 Lakh">Below ₹1 Lakh</option>
                    <option value="₹1 Lakh - ₹3 Lakhs">₹1 Lakh - ₹3 Lakhs</option>
                    <option value="₹3 Lakhs - ₹7 Lakhs">₹3 Lakhs - ₹7 Lakhs</option>
                    <option value="₹7 Lakhs - ₹15 Lakhs">₹7 Lakhs - ₹15 Lakhs</option>
                    <option value="₹15 Lakhs - ₹30 Lakhs">₹15 Lakhs - ₹30 Lakhs</option>
                    <option value="Above ₹30 Lakhs">Above ₹30 Lakhs</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Preferred Callback Window
                  </label>
                  <select
                    value={newLeadForm.preferredTime}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        preferredTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="Any time (10 AM - 7 PM)">Any time (10 AM - 7 PM)</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-brand-navy mb-1">
                  Initial Consultation Note (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Caller holds 2 HDFC cards and 1 Bajaj Finserv personal loan. Harassment reported from collection agency."
                  value={newLeadForm.initialNote}
                  onChange={(e) =>
                    setNewLeadForm({
                      ...newLeadForm,
                      initialNote: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-brand-navy font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-5 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  {addLoading ? "Saving..." : "Save New Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-brand-navy-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-emerald-light uppercase tracking-wider font-mono">
                  Enquiry Ref: {selectedLead.id}
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
                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border space-y-1">
                  <div className="text-slate-400">Mobile Phone</div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedLead.mobile}`}
                      className="font-bold text-brand-navy hover:text-brand-emerald text-sm flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                      {selectedLead.mobile}
                    </a>
                  </div>
                  <div className="pt-1">
                    <a
                      href={getWhatsAppUrl(selectedLead.mobile, selectedLead.fullName)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-emerald font-semibold text-[11px] hover:underline flex items-center gap-1"
                    >
                      Open WhatsApp Chat &rarr;
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border">
                  <div className="text-slate-400">Email Address</div>
                  <div className="font-semibold text-brand-navy truncate mt-0.5">
                    {selectedLead.email ? (
                      <a href={`mailto:${selectedLead.email}`} className="hover:underline">
                        {selectedLead.email}
                      </a>
                    ) : (
                      "None provided"
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2">
                    Preferred Time: {selectedLead.preferredTime || "Any time"}
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

              {/* Payment Status Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-brand-border text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                    Payment &amp; Priority Tier
                  </span>
                  {selectedLead.paymentStatus === "PAID" ? (
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ₹{selectedLead.paymentAmount || 499} PAID (Fast-Track Priority)
                    </span>
                  ) : selectedLead.paymentStatus === "PENDING" ? (
                    <span className="px-2.5 py-0.5 rounded-full font-medium text-[10px] bg-amber-100 text-amber-800 border border-amber-200">
                      Payment Initiated (Pending)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full font-medium text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                      Free Standard Enquiry (Unpaid)
                    </span>
                  )}
                </div>
                {selectedLead.razorpayPaymentId && (
                  <div className="text-[11px] font-mono text-slate-600 pt-1">
                    Razorpay Payment ID: <span className="font-bold text-slate-800">{selectedLead.razorpayPaymentId}</span>
                  </div>
                )}
                <div className="text-[10px] text-slate-400">
                  Channel: {selectedLead.source} • Consent: {selectedLead.consentGiven ? "Verified" : "Pending"}
                </div>
              </div>

              {/* Client Hardship Summary */}
              {selectedLead.description && (
                <div className="p-4 bg-slate-50 rounded-xl border border-brand-border text-xs space-y-1">
                  <div className="font-bold text-brand-navy">Client Situation &amp; Notes:</div>
                  <p className="text-brand-text leading-relaxed">
                    {selectedLead.description}
                  </p>
                </div>
              )}

              {/* Status Update Form */}
              <div className="p-4 bg-brand-mint/40 rounded-xl border border-brand-border space-y-4">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Update Lead Status &amp; Follow-up
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Current Pipeline Status
                    </label>
                    <select
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                    >
                      <option value="NEW">New (Uncontacted)</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="FOLLOW_UP">Follow-up Scheduled</option>
                      <option value="IN_PROGRESS">In Active Negotiation</option>
                      <option value="CONVERTED">Converted / Settled</option>
                      <option value="CLOSED">Closed / Ineligible</option>
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
                    Add Advisor Case Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Document call notes, agreed settlement percentage, bank OTS response, or next steps..."
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
                  {saving ? "Saving Changes..." : "Save Case Updates"}
                </button>
              </div>

              {/* Case History / Notes Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-emerald" />
                  Advisor Notes Timeline ({selectedLead.notes?.length || 0})
                </h4>

                <div className="space-y-2">
                  {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes recorded yet for this client.</p>
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
