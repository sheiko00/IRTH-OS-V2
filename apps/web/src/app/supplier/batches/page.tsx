'use client';

import { useState } from 'react';
import { Package, Search, Plus, Calendar, Edit, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupplierBatchesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const batches = [
    { id: '1', batchNo: 'B-2026-004', productName: 'Radiance Serum', variant: '30ml', quantity: 5000, status: 'IN_PRODUCTION', mfgDate: '2026-05-01', expDate: '2028-05-01' },
    { id: '2', batchNo: 'B-2026-003', productName: 'Hydra Moisturizer', variant: '50ml', quantity: 2000, status: 'READY_FOR_PICKUP', mfgDate: '2026-04-15', expDate: '2028-04-15' },
    { id: '3', batchNo: 'B-2026-002', productName: 'Vitamin C Toner', variant: '200ml', quantity: 3000, status: 'COMPLETED', mfgDate: '2026-03-10', expDate: '2027-03-10' },
    { id: '4', batchNo: 'B-2026-001', productName: 'Deep Cleansing Gel', variant: '150ml', quantity: 4500, status: 'COMPLETED', mfgDate: '2026-02-05', expDate: '2028-02-05' },
  ];

  const filtered = batches.filter(b => {
    if (search && !b.batchNo.toLowerCase().includes(search.toLowerCase()) && !b.productName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && b.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Batches</h1>
          <p className="text-muted-foreground">Manage your manufacturing runs</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
          <Plus className="w-4 h-4" /> New Batch
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by batch number or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Statuses</option>
          <option value="IN_PRODUCTION">In Production</option>
          <option value="READY_FOR_PICKUP">Ready for Pickup</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Batch Number</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Product</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Quantity</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Dates</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
                <th className="text-right text-xs font-semibold text-muted-foreground p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((batch) => (
                <tr key={batch.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-semibold font-mono">{batch.batchNo}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{batch.productName}</p>
                    <p className="text-xs text-muted-foreground">{batch.variant}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-semibold">{batch.quantity}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>MFG: {batch.mfgDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>EXP: {batch.expDate}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn('inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border',
                      batch.status === 'COMPLETED' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                      batch.status === 'READY_FOR_PICKUP' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                      'text-amber-500 bg-amber-500/10 border-amber-500/20'
                    )}>
                      {batch.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="View Details">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Update Status">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No batches found</p>
          </div>
        )}
      </div>
    </div>
  );
}
