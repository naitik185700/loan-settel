"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, User, Key, AlertCircle, Loader2 } from "lucide-react";

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({
    name: "Master Administrator",
    email: "admin@settleloanexpert.in",
    password: "",
    confirmPassword: "",
    setupKey: "SettleLoanExpert@Init2026",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          setupKey: formData.setupKey,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Setup failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-brand-border p-8 space-y-6">
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
            First-Time Super Admin Setup
          </h1>
          <p className="text-xs text-brand-muted">
            Configure your master administrator account for Settle Loan Expert
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Master Setup Key
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.setupKey}
                onChange={(e) =>
                  setFormData({ ...formData, setupKey: e.target.value })
                }
                className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Default master key: <span className="font-mono">SettleLoanExpert@Init2026</span> (configured via SETUP_KEY in .env)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Min 8 chars, 1 upper, 1 num"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Provisioning Admin...
              </>
            ) : (
              "Initialize Master Account"
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/admin/login"
            className="text-xs text-brand-navy hover:underline"
          >
            Already configured? Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
