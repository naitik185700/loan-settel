"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  Zap,
  Building2,
  PhoneCall,
  Clock,
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
  title = "Book a Free Confidential Debt Assessment",
  subtitle = "Fill in your details below to speak directly with our senior debt resolution advisors under RBI borrower guidelines.",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    loanCategory: defaultCategory,
    lenderName: "",
    outstandingAmount: "₹1 Lakh - ₹5 Lakhs",
    preferredTime: "Morning (10 AM - 1 PM)",
    description: "",
    consentGiven: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    leadId: string;
    fullName: string;
    mobile: string;
    loanCategory: string;
    outstandingAmount: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.consentGiven) {
      setError("You must agree to the privacy policy to request a consultation.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mobile: cleanMobile,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      const assignedId =
        data.leadId || "SLE-" + Math.floor(100000 + Math.random() * 900000);

      setSubmittedLead({
        leadId: assignedId,
        fullName: formData.fullName,
        mobile: cleanMobile,
        loanCategory: formData.loanCategory,
        outstandingAmount: formData.outstandingAmount,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please call our direct helpline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border/80 shadow-card overflow-hidden relative">
      {/* Form Header matching debtsfree */}
      <div className="bg-gradient-to-r from-[#173447] to-[#102B3C] text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald-light text-xs font-bold uppercase tracking-wider border border-brand-emerald/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand-emerald-light" />
          <span>Confidential Legal Case Evaluation</span>
        </div>

        <h2 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald-light" />
            <span>256-Bit SSL Encrypted Intake</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-brand-emerald-light" />
            <span>Direct CRM Entry &amp; Privacy Assured</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8">
        {submittedLead ? (
          /* Success Screen on the Still Page */
          <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-brand-emerald rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-mint text-brand-navy border border-brand-border mb-2">
                Reference ID: {submittedLead.leadId}
              </span>
              <h3 className="text-2xl font-black text-brand-navy">
                Inquiry Registered Successfully!
              </h3>
              <p className="text-sm text-brand-text mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{submittedLead.fullName}</strong>. Your consultation details have been submitted directly to our Legal Advisory Team. A dedicated settlement advisor will review your lender portfolio and contact you at <strong>+91 {submittedLead.mobile}</strong>.
              </p>
            </div>

            {/* Review Summary Card */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-brand-border/60">
                <span className="text-brand-muted">Applicant Name</span>
                <span className="font-semibold text-brand-navy">{submittedLead.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/60">
                <span className="text-brand-muted">Primary Mobile</span>
                <span className="font-semibold text-brand-navy font-mono">+91 {submittedLead.mobile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/60">
                <span className="text-brand-muted">Debt Category</span>
                <span className="font-semibold text-brand-navy">{submittedLead.loanCategory}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-muted">Consultation Status</span>
                <span className="font-bold text-brand-emerald">Registered (Standard Queue)</span>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="bg-brand-mint/60 p-4 rounded-xl text-left border border-brand-border/60 text-xs text-brand-text space-y-2 max-w-md mx-auto">
              <div className="font-bold text-brand-navy flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-brand-emerald" />
                What to expect next:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Preliminary evaluation of your unsecured loan portfolio &amp; hardship grounds.</li>
                <li>Clear briefing on your protections under the RBI Fair Practices Code.</li>
                <li>Exploration of formal One-Time Settlement (OTS) and EMI restructuring.</li>
              </ul>
            </div>

            {/* Priority Callback Option */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/consultation-payment?leadId=${submittedLead.leadId}&name=${encodeURIComponent(submittedLead.fullName)}&mobile=${encodeURIComponent(submittedLead.mobile)}&loanCategory=${encodeURIComponent(submittedLead.loanCategory)}&amount=${encodeURIComponent(submittedLead.outstandingAmount)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-emerald text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-brand-emerald-dark transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Want Priority 30-Min Callback? (₹499 Razorpay)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedLead(null);
                  setFormData({
                    fullName: "",
                    mobile: "",
                    email: "",
                    city: "",
                    loanCategory: defaultCategory,
                    lenderName: "",
                    outstandingAmount: "₹1 Lakh - ₹5 Lakhs",
                    preferredTime: "Morning (10 AM - 1 PM)",
                    description: "",
                    consentGiven: true,
                  });
                }}
                className="text-xs text-brand-muted hover:text-brand-navy transition-colors underline"
              >
                Submit Another Consultation Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Active Intake Form */
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Row 1: Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    placeholder="98765 43210"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent font-mono transition"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Email Address{" "}
                  <span className="text-slate-400 font-normal">
                    (for settlement proposal)
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  City / State
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g. Delhi NCR, Mumbai, Bengaluru"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Row 3: Loan Category & Total Outstanding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="loanCategory"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Loan / Debt Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="loanCategory"
                  name="loanCategory"
                  value={formData.loanCategory}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition bg-white"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Credit Card Debt">Credit Card Debt</option>
                  <option value="NBFC / Instant App Loan">NBFC / Instant App Loan</option>
                  <option value="Business Loan">Business / MSME Loan</option>
                  <option value="Education Loan">Education Loan</option>
                  <option value="Home / LAP Loan">Home / LAP Loan</option>
                  <option value="Multiple Loans / Mixed">Multiple Loans &amp; Cards</option>
                  <option value="Other">Other Unsecured Debt</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="outstandingAmount"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Total Outstanding Debt <span className="text-red-500">*</span>
                </label>
                <select
                  id="outstandingAmount"
                  name="outstandingAmount"
                  value={formData.outstandingAmount}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition bg-white"
                >
                  <option value="Below ₹1 Lakh">Below ₹1 Lakh</option>
                  <option value="₹1 Lakh - ₹5 Lakhs">₹1 Lakh to ₹5 Lakhs</option>
                  <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs to ₹10 Lakhs</option>
                  <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs to ₹25 Lakhs</option>
                  <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs to ₹50 Lakhs</option>
                  <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                </select>
              </div>
            </div>

            {/* Row 4: Primary Bank/Lender & Preferred Window */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lenderName"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Primary Bank or Lender Name
                </label>
                <input
                  type="text"
                  id="lenderName"
                  name="lenderName"
                  placeholder="e.g. HDFC, ICICI, SBI, Bajaj, Axis"
                  value={formData.lenderName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-xs font-bold text-brand-navy mb-1"
                >
                  Preferred Callback Window
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition bg-white"
                >
                  <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                  <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  <option value="Any time (10 AM - 7 PM)">Any time (10 AM - 7 PM)</option>
                </select>
              </div>
            </div>

            {/* Hardship Reason / Notes */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs font-bold text-brand-navy mb-1"
              >
                Financial Hardship Reason{" "}
                <span className="text-slate-400 font-normal">
                  (helps in institutional OTS concession)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="e.g. Job loss, business cashflow contraction, medical emergency, high interest rate burden..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-brand-text">
                <input
                  type="checkbox"
                  name="consentGiven"
                  checked={formData.consentGiven}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-brand-emerald border-brand-border rounded focus:ring-brand-emerald"
                />
                <span>
                  I authorize <strong>{BRAND.legalEntity}</strong> to contact me regarding debt resolution under RBI guidelines and agree to the{" "}
                  <a href="/privacy-policy" className="text-brand-emerald underline font-semibold">
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-emerald to-teal-700 hover:from-brand-emerald-dark hover:to-teal-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-emerald/20 hover:shadow-brand-emerald/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Securely to CRM...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Confidential Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-1">
              🔒 Data encrypted with bank-grade 256-bit SSL. Never shared with recovery agents.
            </div>
          </form>
        )}
      </div>

      {/* Footer Legal Assurance */}
      <div className="p-3.5 bg-slate-50 border-t border-brand-border/60 text-center text-[11px] text-slate-500">
        Operated by <strong>{BRAND.legalEntity}</strong> • {BRAND.address}.
      </div>
    </div>
  );
}
