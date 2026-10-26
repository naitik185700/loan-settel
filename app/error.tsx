"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-brand-border shadow-card text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-navy">
          Something went wrong
        </h1>
        <p className="text-sm text-brand-text leading-relaxed">
          An unexpected error occurred while loading this page. Our technical team has been notified.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-semibold hover:bg-brand-emerald-dark transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-border text-brand-navy text-xs font-semibold hover:bg-brand-mint transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
