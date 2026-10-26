"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, RefreshCw, Clock, User, Activity } from "lucide-react";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) {
        const json = await res.json();
        setLogs(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Security & Operational Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Immutable system logs tracking administrator logins, status modifications, and content updates
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-brand-border text-xs font-semibold text-brand-navy hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Logs
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-emerald mx-auto"></div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No audit records registered yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 font-mono text-[11px]">
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-brand-navy font-semibold font-sans">
                      {log.userEmail || "System"}
                    </td>
                    <td className="py-3.5 px-4 text-brand-emerald font-semibold">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-sans max-w-xs truncate">
                      {log.details || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
