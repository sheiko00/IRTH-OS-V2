'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Factory, Globe, FileText, CheckCircle2, XCircle, Mail, Phone } from 'lucide-react';
import { cn, getStatusColor } from '@/lib/utils';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSuppliers([
        { id: '1', name: 'Premium Labs', company: 'Premium Labs Manufacturing', email: 'contact@premiumlabs.in', phone: '+91987654321', country: 'India', status: 'APPROVED', _count: { files: 8, productionBatches: 12, payouts: 5 }, createdAt: '2026-01-10' },
        { id: '2', name: 'Green Essence', company: 'Green Essence Co.', email: 'info@greenessence.com', phone: '+86123456789', country: 'China', status: 'APPROVED', _count: { files: 4, productionBatches: 6, payouts: 3 }, createdAt: '2026-02-15' },
        { id: '3', name: 'EcoPack Solutions', company: 'EcoPack Solutions LLC', email: 'ops@ecopack.ae', phone: '+971501234567', country: 'UAE', status: 'PENDING', _count: { files: 2, productionBatches: 0, payouts: 0 }, createdAt: '2026-04-20' },
        { id: '4', name: 'LabChem Egypt', company: 'LabChem Industries', email: 'sales@labchem.eg', phone: '+201012345678', country: 'Egypt', status: 'APPROVED', _count: { files: 6, productionBatches: 8, payouts: 4 }, createdAt: '2026-03-01' },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-2xl animate-pulse" />)}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">{suppliers.length} registered suppliers</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="p-6 rounded-2xl border border-border bg-card hover:border-purple-500/30 transition-all hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-border flex items-center justify-center">
                  <Factory className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  <p className="text-xs text-muted-foreground">{supplier.company}</p>
                </div>
              </div>
              <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold border', getStatusColor(supplier.status))}>
                {supplier.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-3.5 h-3.5" /> {supplier.country}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5" /> {supplier.email}
              </div>
              {supplier.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" /> {supplier.phone}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="text-center">
                <p className="text-lg font-bold">{supplier._count.productionBatches}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Batches</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{supplier._count.files}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Files</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{supplier._count.payouts}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Payouts</p>
              </div>
              <div className="ml-auto">
                <button className="px-4 py-2 text-xs font-medium rounded-lg border border-border hover:bg-accent transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
