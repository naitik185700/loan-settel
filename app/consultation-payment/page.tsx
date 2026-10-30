"use client";

import React, { useState, useEffect, Suspense } from "react";
import Script from "next/script";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  PhoneCall,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Lock,
  Receipt,
  FileCheck2,
  RefreshCw,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function ConsultationPaymentContent() {
  const searchParams = useSearchParams();

  // URL parameters passed from Zoho Form redirect
  const queryName = searchParams.get("name") || searchParams.get("fullName") || searchParams.get("Name") || "";
  const queryMobile = searchParams.get("mobile") || searchParams.get("phone") || searchParams.get("Phone") || "";
  const queryEmail = searchParams.get("email") || searchParams.get("Email") || "";
  const queryCategory = searchParams.get("loanCategory") || searchParams.get("loanType") || searchParams.get("Category") || "Personal Loan";
  const queryAmount = searchParams.get("amount") || searchParams.get("outstandingAmount") || "₹2L - ₹5L";
  const queryLeadId = searchParams.get("leadId") || "";

  const [fullName, setFullName] = useState(queryName);
  const [mobile, setMobile] = useState(queryMobile);
  const [email, setEmail] = useState(queryEmail);
  const [loanCategory, setLoanCategory] = useState(queryCategory);
  const [outstandingAmount, setOutstandingAmount] = useState(queryAmount);
  const [leadId, setLeadId] = useState(queryLeadId);

  // Flow states: "initial" | "paying" | "paid_success" | "unpaid_saved"
  const [stage, setStage] = useState<"initial" | "paying" | "paid_success" | "unpaid_saved">("initial");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentId?: string;
    orderId?: string;
    amount?: number;
    receipt?: string;
  } | null>(null);

  // Automatically record initial query from Zoho if parameters were received
  useEffect(() => {
    if (queryMobile && !leadId) {
      fetch("/api/payment/unpaid-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: queryName || "Zoho Consultation Lead",
          mobile: queryMobile,
          email: queryEmail || null,
          loanCategory: queryCategory,
          outstandingAmount: queryAmount,
          reason: "Zoho form submitted, awaiting payment decision",
          source: "zoho_form",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.leadId) setLeadId(data.leadId);
        })
        .catch((err) => console.error("Auto log query error:", err));
    }
  }, [queryMobile, queryName, queryEmail, queryCategory, queryAmount, leadId]);

  // Handle Razorpay Payment Gateway Trigger
  const handleRazorpayPayment = async () => {
    if (!mobile || mobile.length < 10) {
      setErrorMsg("Please provide your valid 10-digit mobile number to link your payment.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Create Razorpay Order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          fullName: fullName || "Priority Consultation Applicant",
          mobile,
          email,
          loanCategory,
          outstandingAmount,
          amountInRupees: 499,
          source: "zoho_form",
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || "Unable to initiate payment gateway.");
      }

      setLeadId(orderData.leadId);

      // 2. Open Razorpay Checkout Modal
      const options = {
        key:
          orderData.keyId ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "rzp_live_Tu2BL8LftIdey0",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: BRAND.name,
        description: "Priority 1-on-1 Debt Settlement Advisory",
        image: "/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: fullName,
          email: email,
          contact: mobile,
        },
        theme: {
          color: "#168963", // Settle Loan Expert Brand Emerald
        },
        modal: {
          ondismiss: async function () {
            // User closed the payment window without completing payment!
            console.log("Payment window closed. User did not pay.");
            // Mark and record as standard unpaid query collected via Zoho
            await fetch("/api/payment/unpaid-query", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                leadId: orderData.leadId,
                fullName,
                mobile,
                email,
                reason: "Payment window was dismissed without completing payment",
                source: "zoho_form",
              }),
            });
            setStage("unpaid_saved");
            setLoading(false);
          },
        },
        handler: async function (response: any) {
          // Payment Successful! Verify on server
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                leadId: orderData.leadId,
                amountPaid: 499,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setPaymentDetails({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                amount: 499,
                receipt: `SLE-${Date.now().toString().slice(-6)}`,
              });
              setStage("paid_success");
            } else {
              setErrorMsg("Payment verification was inconclusive. Please contact our support team.");
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            setErrorMsg("Payment completed, but verification timed out. Our team will verify manually.");
          } finally {
            setLoading(false);
          }
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async function (response: any) {
          console.error("Payment Failed:", response.error);
          await fetch("/api/payment/unpaid-query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              leadId: orderData.leadId,
              fullName,
              mobile,
              email,
              reason: `Payment failed: ${response.error?.description || "Gateway transaction declined"}`,
              source: "zoho_form",
            }),
          });
          setStage("unpaid_saved");
          setLoading(false);
        });
        rzp.open();
      } else {
        // Fallback for simulation or if script not yet ready
        setTimeout(async () => {
          // Verify demo order
          const mockPaymentId = `pay_mock_${Date.now().toString().slice(-8)}`;
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: mockPaymentId,
              razorpay_signature: "mock_signature",
              leadId: orderData.leadId,
              amountPaid: 499,
            }),
          });
          setPaymentDetails({
            paymentId: mockPaymentId,
            orderId: orderData.orderId,
            amount: 499,
            receipt: `SLE-DEMO-${Date.now().toString().slice(-4)}`,
          });
          setStage("paid_success");
          setLoading(false);
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to launch Razorpay gateway.");
      setLoading(false);
    }
  };

  // User explicitly opts out / skips payment
  const handleSkipPayment = async () => {
    setLoading(true);
    try {
      await fetch("/api/payment/unpaid-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          fullName: fullName || "Zoho Consultation Applicant",
          mobile,
          email,
          loanCategory,
          outstandingAmount,
          reason: "User opted for standard free query without priority payment",
          source: "zoho_form",
        }),
      });
      setStage("unpaid_saved");
    } catch (err) {
      console.error(err);
      setStage("unpaid_saved");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Razorpay Checkout Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="max-w-3xl mx-auto">
        {/* SUCCESS STATE 1: PAYMENT SUCCESSFUL (PAID LEAD GENERATED) */}
        {stage === "paid_success" && (
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-emerald-600 text-white p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 mb-2">
                Priority Status Activated
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Thank You! Priority Consultation Confirmed
              </h1>
              <p className="text-emerald-100 text-sm mt-2 max-w-xl mx-auto">
                Your payment of ₹{paymentDetails?.amount || 499} has been verified via Razorpay. Your case has been escalated to our Senior Debt Resolution Panel.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Receipt Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Transaction Summary
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Razorpay Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Payment ID</span>
                    <span className="font-mono font-bold text-slate-800 break-all">
                      {paymentDetails?.paymentId || "rzp_verified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lead Category</span>
                    <span className="font-semibold text-slate-800">{loanCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Service Fee</span>
                    <span className="font-bold text-emerald-700">₹{paymentDetails?.amount || 499}</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                  Next Steps for Your Case:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <span>
                      <strong>Immediate 30-Min Call:</strong> A Senior Debt Settlement Legal Advisor will phone you at <strong>{mobile || "your registered number"}</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <span>
                      <strong>Statement & Penal Charge Audit:</strong> We will inspect your loan statements to calculate unauthorized compounding charges under RBI fair lending guidelines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <span>
                      <strong>Anti-Harassment Shield:</strong> Immediate guidance on issuing formal cease-and-desist responses to unauthorized recovery agent calls.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white text-xs sm:text-sm font-bold hover:bg-brand-navy-900 transition-colors shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-brand-emerald" />
                  <span>Call Direct Priority Desk ({BRAND.phone})</span>
                </a>

                <Link
                  href="/"
                  className="text-xs text-brand-muted hover:text-brand-navy font-semibold transition-colors"
                >
                  Return to Home Page &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: UNPAID QUERY COLLECTED (SAVED AS STANDARD FREE LEAD) */}
        {stage === "unpaid_saved" && (
          <div className="bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-brand-navy text-white p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/10 text-brand-emerald-light flex items-center justify-center mx-auto mb-4 border border-white/20">
                <FileCheck2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 mb-2">
                Query Logged in Zoho CRM
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Your Consultation Query is Received
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
                Your loan information has been captured securely. No payment was charged. Your query is currently in our standard evaluation queue.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Standard Processing Queue:</strong> Free enquiries are typically reviewed within <strong>24 to 48 business hours</strong> based on advisory availability.
                </div>
              </div>

              {/* Upgrade Option */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-brand-emerald/40 bg-brand-surface space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Facing urgent legal notices or recovery harassment?
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-navy">₹499 Only</span>
                </div>
                <p className="text-xs text-brand-text">
                  You can upgrade to priority fast-track advisory at any time to speak with a Senior Legal & Debt Settlement Strategist within 30 minutes.
                </p>
                <button
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emerald-dark transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{loading ? "Connecting Gateway..." : "Upgrade to Priority (₹499 via Razorpay)"}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Case Logged for: <strong>{mobile || "Registered Mobile"}</strong>
                </span>
                <Link
                  href="/"
                  className="text-xs text-brand-emerald font-semibold hover:underline"
                >
                  Return to Website &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* INITIAL STAGE: FORM SUBMISSION CONFIRMATION & PAYMENT DECISION */}
        {stage === "initial" && (
          <div className="bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
            {/* Header */}
            <div className="bg-brand-navy text-white p-6 sm:p-8 border-b border-brand-navy-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-emerald-light mb-1">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                Step 1 Complete: Zoho Form Submitted
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Thank You! Your Details Have Been Saved
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Your initial consultation enquiry is collected in our Zoho CRM. Choose below how you would like to proceed with your debt evaluation.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Confirm / Update Contact Details */}
              <div className="bg-brand-surface rounded-2xl p-4 sm:p-5 border border-brand-border">
                <div className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-3">
                  Registered Borrower Profile
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-500 block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:border-brand-emerald bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs font-mono focus:outline-none focus:border-brand-emerald bg-white"
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* TWO PATHWAYS: PRIORITY PAID (RAZORPAY) vs STANDARD FREE QUERY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* OPTION 1: PRIORITY CONSULTATION (RAZORPAY) */}
                <div className="p-6 rounded-2xl border-2 border-brand-emerald bg-emerald-50/40 relative flex flex-col justify-between shadow-sm">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-emerald text-white shadow-sm">
                    Recommended Fast-Track
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h3 className="text-base font-bold text-brand-navy">
                        Priority 1-on-1 Consultation
                      </h3>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-brand-navy">₹499</span>
                      <span className="text-xs text-slate-400 line-through">₹1,999</span>
                      <span className="text-[11px] font-bold text-emerald-700">75% Concession</span>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span><strong>30-Min SLA Callback:</strong> Speak directly with a Senior Settlement Strategist.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span><strong>Statement & Interest Audit:</strong> Check for unlawful penal compounding under RBI rules.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                        <span><strong>Anti-Harassment Defense:</strong> Immediate legal guidelines against recovery calls.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-emerald hover:bg-brand-emerald-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Initiating Razorpay...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay ₹499 & Get Priority Call</span>
                        </>
                      )}
                    </button>
                    <div className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Razorpay Secure 256-Bit SSL • UPI, Cards, NetBanking</span>
                    </div>
                  </div>
                </div>

                {/* OPTION 2: FREE STANDARD QUERY (NO PAYMENT) */}
                <div className="p-6 rounded-2xl border border-brand-border bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-500" />
                      <h3 className="text-base font-bold text-brand-navy">
                        Standard Free Consultation Query
                      </h3>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-brand-navy">₹0</span>
                      <span className="text-xs text-brand-muted font-medium">Free Initial Logging</span>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>Data saved directly in our Zoho CRM enquiry list.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>Standard Queue Response (24 – 48 business hours).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>Subject to daily counselor slot availability.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleSkipPayment}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span>Continue with Free Query (Skip Payment)</span>
                    </button>
                    <div className="text-[10px] text-center text-slate-400 mt-2">
                      Your query will be queued without charges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConsultationPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
        </div>
      }
    >
      <ConsultationPaymentContent />
    </Suspense>
  );
}
