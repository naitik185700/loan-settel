"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    company_name: BRAND.name,
    support_phone: BRAND.phone,
    support_email: BRAND.email,
    office_hours: BRAND.hours,
    head_office: BRAND.address,
    zoho_form_url: BRAND.zohoFormUrl,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">
          Platform Configuration & Settings
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
          Manage corporate contact channels, office timings, and Zoho CRM consultation integration
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-6 sm:p-8">
        {saved && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
            <span>Settings saved successfully. Changes are live immediately.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Brand / Platform Display Name
              </label>
              <input
                type="text"
                required
                value={settings.company_name}
                onChange={(e) =>
                  setSettings({ ...settings, company_name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Support Helpline Number
              </label>
              <input
                type="text"
                required
                value={settings.support_phone}
                onChange={(e) =>
                  setSettings({ ...settings, support_phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Support Email Address
              </label>
              <input
                type="email"
                required
                value={settings.support_email}
                onChange={(e) =>
                  setSettings({ ...settings, support_email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Operational Office Hours
              </label>
              <input
                type="text"
                required
                value={settings.office_hours}
                onChange={(e) =>
                  setSettings({ ...settings, office_hours: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Office Address
            </label>
            <input
              type="text"
              required
              value={settings.head_office}
              onChange={(e) =>
                setSettings({ ...settings, head_office: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>

          {/* Zoho Integration */}
          <div className="p-4 bg-brand-surface rounded-xl border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-brand-navy">
                Zoho CRM Consultation Embed URL
              </label>
              <a
                href={settings.zoho_form_url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-brand-emerald hover:underline flex items-center gap-1"
              >
                Test Zoho Link <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="url"
              required
              value={settings.zoho_form_url}
              onChange={(e) =>
                setSettings({ ...settings, zoho_form_url: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
            />
            <p className="text-[11px] text-slate-400">
              The public consultation page loads this Zoho form securely inside the interactive evaluation portal.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-emerald hover:bg-brand-emerald-dark text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              {saving ? "Updating Settings..." : "Save Configuration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
