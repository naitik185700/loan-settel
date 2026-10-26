"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-brand-border p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="relative h-12 w-48 mx-auto">
            <Image
              src="/images/logo.png"
              alt="Settle Loan Expert"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-brand-navy pt-2">
            Admin Portal Authentication
          </h1>
          <p className="text-xs text-brand-muted">
            Sign in with your authorized staff credentials
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="admin@settleloanexpert.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Secure Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 flex justify-between items-center border-t border-slate-100">
          <Link
            href="/"
            className="hover:text-brand-navy transition-colors"
          >
            ← Back to Website
          </Link>
          <Link
            href="/admin/setup"
            className="text-brand-emerald font-semibold hover:underline"
          >
            First Admin Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
