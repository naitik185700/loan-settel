"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Send,
  HelpCircle,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

interface EnquiryFormProps {
  defaultCategory?: string;
  source?: string;
  title?: string;
  subtitle?: string;
}

export default function EnquiryForm({
  defaultCategory = "Personal Loan",
  source = "website_enquiry_form",
  title = "Get a Confidential Case Evaluation",
  subtitle = "Discuss your debt situation with an experienced resolution consultant. 100% confidential and compliant with RBI borrower rights.",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    loanCategory: defaultCategory,
    outstandingAmount: "₹2 Lakhs - ₹5 Lakhs",
    preferredTime: "Any time (10 AM - 7 PM)",
    description: "",
    consentGiven: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setLeadId(data.leadId || "SLE-" + Math.floor(100000 + Math.random() * 900000));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-brand-border overflow-hidden">
      {/* Top Banner */}
      <div className="bg-brand-navy p-6 sm:p-8 text-white">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Confidential & Protected
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-brand-emerald rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-brand-navy">
              Enquiry Received Successfully!
            </h4>
            <div className="inline-block px-3 py-1 bg-brand-surface rounded-md border border-brand-border text-xs text-brand-muted">
              Reference ID: <span className="font-mono font-semibold text-brand-navy">{leadId}</span>
            </div>
            <p className="text-sm text-brand-text max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-brand-navy">{formData.fullName}</strong>. Your enquiry has been routed to our debt advisory team. A consultant will review your situation and contact you via phone or WhatsApp at <strong className="text-brand-navy">{formData.mobile}</strong>.
            </p>
            <div className="bg-brand-mint p-4 rounded-xl text-left border border-brand-border/60 text-xs text-brand-text space-y-2 mt-4 max-w-md mx-auto">
              <div className="font-semibold text-brand-navy">What happens next?</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Initial confidential review of your outstanding debt structure.</li>
                <li>Clear briefing on your rights under the RBI Fair Practices Code.</li>
                <li>Exploration of viable one-time settlement or restructuring paths.</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({
                  fullName: "",
                  mobile: "",
                  email: "",
                  loanCategory: defaultCategory,
                  outstandingAmount: "₹2 Lakhs - ₹5 Lakhs",
                  preferredTime: "Any time (10 AM - 7 PM)",
                  description: "",
                  consentGiven: true,
                });
              }}
              className="mt-4 px-6 py-2.5 bg-brand-navy text-white text-sm font-semibold rounded-lg hover:bg-brand-navy-dark transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Mobile Number (India) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-brand-muted font-bold">
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
                    className="w-full pl-12 pr-3.5 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Debt Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loanCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, loanCategory: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Credit Card Debt">Credit Card Debt</option>
                  <option value="Business Loan">Business / MSME Loan</option>
                  <option value="Multiple Loans / Mixed">Multiple Loans & Credit Cards</option>
                  <option value="Other">Other Unsecured Debt</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Estimated Total Outstanding <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.outstandingAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, outstandingAmount: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
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
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  Preferred Contact Time <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredTime: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  <option value="Any time (10 AM - 7 PM)">Any time (10 AM - 7 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Brief Situation Summary <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention number of banks/NBFCs, nature of hardship (medical, job loss, business setback), or if you are facing recovery agent calls."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            {/* Privacy & Consent */}
            <div className="flex items-start gap-3 p-3 bg-brand-surface rounded-xl border border-brand-border/60">
              <input
                type="checkbox"
                id="enquiry_consent"
                checked={formData.consentGiven}
                onChange={(e) =>
                  setFormData({ ...formData, consentGiven: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-brand-border text-brand-emerald focus:ring-brand-emerald"
                required
              />
              <label
                htmlFor="enquiry_consent"
                className="text-xs text-brand-text leading-relaxed"
              >
                I authorize Settle Loan Expert and its debt resolution advisors to contact me via phone call, SMS, or WhatsApp regarding my enquiry. I understand that my information is strictly confidential and protected under our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-brand-emerald underline font-medium"
                >
                  Privacy Policy
                </a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Confidential Details...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit for Free Evaluation
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span>🔒 256-Bit SSL Encryption</span>
              <span>•</span>
              <span>🚫 No Upfront Lender Charges</span>
              <span>•</span>
              <span>🛡️ 100% Confidential</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
