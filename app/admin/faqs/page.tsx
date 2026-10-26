"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, Plus, Edit2, Trash2, X, Save } from "lucide-react";

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Settlement",
    order: 0,
    isActive: true,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const json = await res.json();
        setFaqs(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setFormData({
      question: "",
      answer: "",
      category: "Settlement",
      order: faqs.length + 1,
      isActive: true,
    });
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: any) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isActive: faq.isActive,
    });
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFaq
        ? `/api/admin/faqs/${editingFaq.id}`
        : "/api/admin/faqs";
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchFaqs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      if (res.ok) fetchFaqs();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            FAQ Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Manage consumer questions and accurate educational explanations
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emerald-dark transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4 w-12">#</th>
                <th className="py-3.5 px-4">Question</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-emerald mx-auto"></div>
                  </td>
                </tr>
              ) : faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No FAQs defined yet.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {faq.order}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy max-w-lg">
                        {faq.question}
                      </div>
                      <div className="text-brand-text line-clamp-1 mt-0.5 text-[11px]">
                        {faq.answer}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium text-[10px]">
                        {faq.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          faq.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {faq.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(faq)}
                        className="p-1.5 text-slate-400 hover:text-brand-emerald"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-brand-border w-full max-w-lg overflow-hidden">
            <div className="p-5 bg-brand-navy text-white flex justify-between items-center">
              <h3 className="font-bold text-base text-white">
                {editingFaq ? "Edit FAQ" : "Add New FAQ"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="Settlement">Settlement</option>
                    <option value="Process">Process</option>
                    <option value="Legal & Credit">Legal & Credit</option>
                    <option value="Fees">Fees & Policies</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-brand-border rounded-lg text-xs font-semibold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-lg text-xs font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
