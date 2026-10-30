"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ShieldCheck,
  Loader2,
  Sparkles,
  PhoneCall,
  Zap,
  ArrowRight,
  Info,
} from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { BRAND } from "@/lib/constants";

interface ZohoConsultationEmbedProps {
  zohoUrl?: string;
}

export default function ZohoConsultationEmbed({
  zohoUrl = BRAND.zohoFormUrl,
}: ZohoConsultationEmbedProps) {
  // Check if URL is an internal Zoho admin/dashboard link (which cannot be iframed due to Zoho security)
  const isDashboardUrl =
    !zohoUrl ||
    zohoUrl.includes("/home#") ||
    zohoUrl.endsWith("/home") ||
    !zohoUrl.includes("/form/");

  // If it's a dashboard link, default to direct fast form so visitors never see a crashed iframe
  const [activeTab, setActiveTab] = useState<"zoho" | "direct">(
    isDashboardUrl ? "direct" : "zoho"
  );
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "string" &&
        (event.data.includes("submitted") ||
          event.data.includes("form-submitted") ||
          event.data.includes("zf_form_submitted"))
      ) {
        window.location.href = "/consultation-payment?source=zoho_embed";
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full">
      {/* Switcher Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1.5 bg-brand-surface rounded-xl border border-brand-border shadow-sm">
          <button
            onClick={() => setActiveTab("zoho")}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "zoho"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-brand-text hover:text-brand-navy"
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-emerald" />
            Zoho Form Embed
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "direct"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-brand-text hover:text-brand-navy"
            }`}
          >
            <PhoneCall className="w-4 h-4 text-brand-emerald" />
            Fast Evaluation Form
          </button>
        </div>
      </div>

      {activeTab === "zoho" ? (
        <div className="bg-white rounded-2xl shadow-card border border-brand-border overflow-hidden">
          {/* Zoho Embed Header */}
          <div className="bg-brand-navy p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-navy-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-brand-emerald-light font-medium mb-1">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                Secure Encrypted Zoho Consultation Portal
              </div>
              <h3 className="text-lg font-bold text-white">
                Book a Confidential Debt Evaluation
              </h3>
            </div>
            <a
              href={zohoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors self-start sm:self-auto"
            >
              Open Fullscreen Form <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* If the URL is an internal dashboard link, Zoho blocks iframing */}
          {isDashboardUrl ? (
            <div className="p-8 bg-slate-50 text-center space-y-4">
              <div className="max-w-md mx-auto p-4 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Zoho Public Share Link Required for In-Page Embed</span>
                </div>
                <p>
                  The current URL (<code>{zohoUrl}</code>) is a Zoho internal account link. Zoho prevents internal account dashboards from being embedded inside iframes for security.
                </p>
                <div className="pt-1 font-semibold text-brand-navy">
                  To embed directly inside this page:
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                  <li>Open your form in Zoho Forms.</li>
                  <li>Click the <strong>Share</strong> tab at the top.</li>
                  <li>Copy the <strong>Public Link (formperma)</strong>.</li>
                  <li>Paste it in <strong>Admin Portal &rarr; Site Settings</strong>.</li>
                </ol>
              </div>

              <div className="pt-2">
                <a
                  href={zohoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white text-xs sm:text-sm font-bold hover:bg-brand-navy-900 transition-colors shadow-sm"
                >
                  <span>Open Zoho Form in New Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-6 border-t border-slate-200 max-w-xl mx-auto">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Or submit directly using our integrated fast form below:
                </div>
                <EnquiryForm
                  title="Direct Fast-Track Debt Evaluation"
                  subtitle="Submit your details below and immediately proceed to consultation confirmation & Razorpay."
                  source="direct_eval_form"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Iframe with loading spinner */}
              <div className="relative min-h-[680px] w-full bg-slate-50 flex flex-col">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6 space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-emerald" />
                    <p className="text-sm font-medium text-brand-navy">
                      Loading secure consultation form...
                    </p>
                    <p className="text-xs text-slate-400 text-center max-w-sm">
                      Powered by Zoho Enterprise CRM. If the form does not appear, you can also use our direct fast form above.
                    </p>
                  </div>
                )}
                <iframe
                  src={zohoUrl}
                  title="Settle Loan Expert Confidential Debt Consultation"
                  className="w-full h-[760px] border-0"
                  onLoad={() => setIframeLoaded(true)}
                  allow="camera; microphone; geolocation"
                />
              </div>

              {/* Post-submission Razorpay guidance */}
              <div className="py-3 px-6 bg-emerald-50/70 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900">
                <span className="flex items-center gap-2 font-medium">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Finished submitting your Zoho form? Verify priority advisory booking below.</span>
                </span>
                <Link
                  href="/consultation-payment"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-emerald text-white font-bold hover:bg-brand-emerald-dark transition-colors shrink-0 shadow-sm"
                >
                  <span>Proceed to Payment &amp; Confirmation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <EnquiryForm
            title="Fast-Track Debt Evaluation"
            subtitle="Submit your contact details and loan types. You will be redirected to consultation confirmation & Razorpay."
            source="free_consultation_direct"
          />
        </div>
      )}
    </div>
  );
}
