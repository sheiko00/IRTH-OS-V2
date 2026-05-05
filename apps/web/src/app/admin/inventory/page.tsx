'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Package, Calendar, TrendingDown, Plus, Search } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default function InventoryPage() {
  const [variants, setVariants] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'stock' | 'alerts' | 'expiring'>('stock');

  useEffect(() => {
    setTimeout(() => {
      setVariants([
        { id: '1', sku: 'RAD-SER-30ML', stockQuantity: 100, product: { name: 'Radiance Serum', coverImageUrl: '' }, reorderAlert: { minStock: 20 } },
        { id: '2', sku: 'RAD-SER-50ML', stockQuantity: 50, product: { name: 'Radiance Serum' }, reorderAlert: { minStock: 15 } },
        { id: '3', sku: 'HYD-CRM-50ML', stockQuantity: 75, product: { name: 'Hydra Moisturizer' }, reorderAlert: null },
        { id: '4', sku: 'CLN-GEL-150ML', stockQuantity: 200, product: { name: 'Deep Cleansing Gel' }, reorderAlert: null },
        { id: '5', sku: 'HGO-100ML', stockQuantity: 3, product: { name: 'Hair Growth Oil' }, reorderAlert: { minStock: 10 } },
        { id: '6', sku: 'VCT-200ML', stockQuantity: 180, product: { name: 'Vitamin C Toner' }, reorderAlert: null },
        { id: '7', sku: 'BLL-250ML', stockQuantity: 8, product: { name: 'Body Lotion Luxe' }, reorderAlert: { minStock: 20 } },
      ]);
      setAlerts([
        { variant: { sku: 'HGO-100ML', stockQuantity: 3, product: { name: 'Hair Growth Oil' } }, minStock: 10 },
        { variant: { sku: 'BLL-250ML', stockQuantity: 8, product: { name: 'Body Lotion Luxe' } }, minStock: 20 },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const totalUnits = variants.reduce((s, v) => s + v.stockQuantity, 0);
  const lowStockCount = variants.filter(v => v.reorderAlert && v.stockQuantity <= v.reorderAlert.minStock).length;

  if (loading) return <div className="space-y-4">{[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">{totalUnits} total units across {variants.length} variants</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <Plus className="w-4 h-4" /> Add Batch
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">Total Stock</span>
          </div>
          <p className="text-2xl font-bold">{totalUnits}</p>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">Low Stock Alerts</span>
          </div>
          <p className="text-2xl font-bold text-red-500">{lowStockCount}</p>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-sm text-muted-foreground">Expiring Soon</span>
          </div>
          <p className="text-2xl font-bold text-amber-500">0</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
        {(['stock', 'alerts', 'expiring'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize', tab === t ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}>
            {t === 'alerts' ? `Alerts (${lowStockCount})` : t}
          </button>
        ))}
      </div>

      {/* Stock Table */}
      {tab === 'stock' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Product / SKU</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Stock</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Reorder Point</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => {
                const isLow = v.reorderAlert && v.stockQuantity <= v.reorderAlert.minStock;
                return (
                  <tr key={v.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-medium">{v.product.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{v.sku}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={cn('text-sm font-bold', isLow ? 'text-red-500' : '')}>{v.stockQuantity}</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all', isLow ? 'bg-red-500' : v.stockQuantity < 50 ? 'bg-amber-500' : 'bg-green-500')}
                            style={{ width: `${Math.min(100, (v.stockQuantity / 200) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{v.reorderAlert?.minStock || '—'}</span>
                    </td>
                    <td className="p-4">
                      {isLow ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-500"><AlertTriangle className="w-3 h-3" /> Low Stock</span>
                      ) : (
                        <span className="text-xs font-semibold text-green-500">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Alerts Tab */}
      {tab === 'alerts' && (
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No alerts</div>
          ) : alerts.map((alert, i) => (
            <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-semibold">{alert.variant.product.name} ({alert.variant.sku})</p>
                  <p className="text-xs text-muted-foreground">Current: {alert.variant.stockQuantity} / Min: {alert.minStock}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-xs font-semibold rounded-lg gradient-primary text-white">Reorder</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'expiring' && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No batches expiring in the next 30 days</p>
        </div>
      )}
    </div>
  );
}
