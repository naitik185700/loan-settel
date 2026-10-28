"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Key,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Bell,
  Cpu,
} from "lucide-react";

export default function SeoSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    SITE_DOMAIN: "https://settleloanexpert.in",
    MIN_PROSPECT_SCORE: "65",
    AUTO_CHECK_INTERVAL_HOURS: "24",
    ALERT_EMAIL: "info@settelloanexpert.in",
    GSC_CLIENT_EMAIL: "",
    GSC_PRIVATE_KEY: "",
    GA4_MEASUREMENT_ID: "",
    MOZ_ACCESS_ID: "",
    MOZ_SECRET_KEY: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/seo/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...(data.settings || {}) }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/seo/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update settings");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-emerald"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-brand-navy">SEO Platform & API Settings</h1>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Super Admin Only
            </span>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Configure Google Search Console, Google Analytics 4, backlink crawler thresholds, and notification alerts.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Safeguards & Thresholds */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-sm pb-3 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span>White-Hat Scoring & Crawl Controls</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Canonical Site Domain
              </label>
              <input
                type="url"
                required
                value={settings.SITE_DOMAIN || "https://settleloanexpert.in"}
                onChange={(e) => setSettings({ ...settings, SITE_DOMAIN: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Minimum Prospect Qualification Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.MIN_PROSPECT_SCORE || "65"}
                onChange={(e) => setSettings({ ...settings, MIN_PROSPECT_SCORE: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
              />
              <span className="text-[11px] text-brand-muted mt-0.5 block">
                Prospects scoring below this threshold will not qualify for automated outreach drafts.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Automated Link Crawl Frequency (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={settings.AUTO_CHECK_INTERVAL_HOURS || "24"}
                onChange={(e) => setSettings({ ...settings, AUTO_CHECK_INTERVAL_HOURS: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Notification & Alert Email
              </label>
              <input
                type="email"
                required
                value={settings.ALERT_EMAIL || "info@settelloanexpert.in"}
                onChange={(e) => setSettings({ ...settings, ALERT_EMAIL: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald"
              />
              <span className="text-[11px] text-brand-muted mt-0.5 block">
                Receives lost backlink alerts and outreach editorial responses.
              </span>
            </div>
          </div>
        </div>

        {/* Google Integrations */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-sm pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Google Search Console & GA4 Connectors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Google Search Console Service Email
              </label>
              <input
                type="text"
                placeholder="service-account@gcp-project.iam.gserviceaccount.com"
                value={settings.GSC_CLIENT_EMAIL || ""}
                onChange={(e) => setSettings({ ...settings, GSC_CLIENT_EMAIL: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={settings.GA4_MEASUREMENT_ID || ""}
                onChange={(e) => setSettings({ ...settings, GA4_MEASUREMENT_ID: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1">
              GSC Service Account Private Key (PEM format)
            </label>
            <textarea
              rows={3}
              placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----"
              value={settings.GSC_PRIVATE_KEY || ""}
              onChange={(e) => setSettings({ ...settings, GSC_PRIVATE_KEY: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Third-Party SEO APIs */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-sm pb-3 border-b border-slate-100">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Third-Party Backlink API Providers (Optional)</span>
          </div>
          <p className="text-xs text-brand-muted">
            Connect Moz, Ahrefs, or Semrush for automated domain metric imports. If left unconfigured, the platform operates seamlessly using our internal crawler and manual data entry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Moz Access ID
              </label>
              <input
                type="text"
                placeholder="moz-access-..."
                value={settings.MOZ_ACCESS_ID || ""}
                onChange={(e) => setSettings({ ...settings, MOZ_ACCESS_ID: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Moz Secret Key
              </label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                value={settings.MOZ_SECRET_KEY || ""}
                onChange={(e) => setSettings({ ...settings, MOZ_SECRET_KEY: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-brand-emerald text-white hover:bg-brand-emerald-dark transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Configuration..." : "Save SEO Platform Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
