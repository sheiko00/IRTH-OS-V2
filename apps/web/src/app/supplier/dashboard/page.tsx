'use client';

import { Package, CheckCircle2, Clock, FileText, Upload } from 'lucide-react';

export default function SupplierDashboardPage() {
  const kpis = [
    { label: 'Active Batches', value: '3', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Completed Batches', value: '12', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Pending Approvals', value: '1', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Files Uploaded', value: '24', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const recentBatches = [
    { id: '1', name: 'Radiance Serum - 30ml', batchNo: 'B-2026-004', quantity: 5000, status: 'IN_PRODUCTION', date: 'May 5, 2026' },
    { id: '2', name: 'Hydra Moisturizer - 50ml', batchNo: 'B-2026-003', quantity: 2000, status: 'READY_FOR_PICKUP', date: 'May 2, 2026' },
    { id: '3', name: 'Vitamin C Toner - 200ml', batchNo: 'B-2026-002', quantity: 3000, status: 'COMPLETED', date: 'Apr 15, 2026' },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Premium Labs.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-6 rounded-2xl border border-border bg-card">
            <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <p className="text-3xl font-bold">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Batches */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Production Batches</h2>
            <button className="text-sm text-emerald-500 hover:text-emerald-600 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{batch.name}</p>
                    <p className="text-xs text-muted-foreground">Batch: {batch.batchNo} • Qty: {batch.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                    batch.status === 'COMPLETED' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                    batch.status === 'READY_FOR_PICKUP' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                    'text-amber-500 bg-amber-500/10 border-amber-500/20'
                  }`}>
                    {batch.status.replace(/_/g, ' ')}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{batch.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Center */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-6">Action Needed</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <h3 className="text-sm font-semibold mb-1">COA Missing</h3>
              <p className="text-xs text-muted-foreground mb-3">Certificate of Analysis is required for Batch B-2026-003.</p>
              <button className="text-xs font-semibold text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-lg w-full">Upload COA</button>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/20">
              <h3 className="text-sm font-semibold mb-1">Invoice Reminder</h3>
              <p className="text-xs text-muted-foreground mb-3">Please upload the invoice for last month&apos;s completed batches.</p>
              <button className="text-xs font-semibold text-foreground border border-border bg-background px-3 py-1.5 rounded-lg w-full">Upload Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
