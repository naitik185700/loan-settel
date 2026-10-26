"use client";

import React, { useState } from "react";
import { X, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    loanCategory: "Personal Loan",
    consentGiven: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic client validation
    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setError("Please provide a valid 10-digit Indian mobile number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobile,
          loanCategory: formData.loanCategory,
          consentGiven: formData.consentGiven,
          source: "callback_modal",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden">
        {/* Header */}
        <div className="bg-brand-navy p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-emerald/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-brand-emerald" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">
                Request an Expert Callback
              </h3>
              <p className="text-xs text-slate-300">
                Confidential • No Obligation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-brand-emerald">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-brand-navy">
                Callback Requested Successfully!
              </h4>
              <p className="text-sm text-brand-text">
                Thank you, <span className="font-semibold">{formData.fullName}</span>. One of our senior debt settlement consultants will call you at <span className="font-semibold">{formData.mobile}</span> during our operational hours ({BRAND.hours}).
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-brand-navy text-white text-sm font-semibold rounded-lg hover:bg-brand-navy-dark transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Mobile Number (India) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-brand-muted font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full pl-12 pr-3.5 py-2 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Loan / Debt Type *
                </label>
                <select
                  value={formData.loanCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, loanCategory: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Credit Card Debt">Credit Card Debt</option>
                  <option value="Business Loan">Business / MSME Loan</option>
                  <option value="Multiple Loans / Mixed">Multiple Loans (Cards + Loans)</option>
                  <option value="Other">Other Unsecured Debt</option>
                </select>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="callback_consent"
                  checked={formData.consentGiven}
                  onChange={(e) =>
                    setFormData({ ...formData, consentGiven: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 rounded border-brand-border text-brand-emerald focus:ring-brand-emerald"
                  required
                />
                <label
                  htmlFor="callback_consent"
                  className="text-xs text-brand-muted leading-tight"
                >
                  I authorize Settle Loan Expert representatives to contact me via Call/WhatsApp regarding my loan enquiry.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Enquiry...
                  </>
                ) : (
                  "Request Callback Now"
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Your data is strictly confidential. We never share your details with 3rd parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
