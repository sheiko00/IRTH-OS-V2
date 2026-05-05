'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, ShoppingCart, Clock, Truck, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { cn, formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  paymentMethod?: string;
  createdAt: string;
  items: { id: string; quantity: number; product: { name: string } }[];
  createdBy?: { name: string };
}

const STATUS_OPTIONS = ['', 'PENDING', 'CONFIRMED', 'PROCESSING', 'IN_PRODUCTION', 'READY', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        { id: '1', orderNumber: 'IRTH-000089', customerName: 'Nour Ahmed', customerPhone: '+201012345678', subtotal: 1350, discount: 100, total: 1250, status: 'SHIPPED', paymentMethod: 'COD', createdAt: '2026-05-05T14:30:00Z', items: [{ id: '1', quantity: 2, product: { name: 'Radiance Serum' } }], createdBy: { name: 'IRTH Admin' } },
        { id: '2', orderNumber: 'IRTH-000088', customerName: 'Sara Hassan', subtotal: 890, discount: 0, total: 890, status: 'PROCESSING', paymentMethod: 'Card', createdAt: '2026-05-05T10:15:00Z', items: [{ id: '2', quantity: 1, product: { name: 'Hydra Moisturizer' } }, { id: '3', quantity: 1, product: { name: 'Vitamin C Toner' } }], createdBy: { name: 'IRTH Admin' } },
        { id: '3', orderNumber: 'IRTH-000087', customerName: 'Mohamed Ali', customerPhone: '+201098765432', subtotal: 2100, discount: 0, total: 2100, status: 'PENDING', paymentMethod: 'COD', createdAt: '2026-05-04T18:00:00Z', items: [{ id: '4', quantity: 3, product: { name: 'Radiance Serum' } }] },
        { id: '4', orderNumber: 'IRTH-000086', customerName: 'Fatima Omar', subtotal: 650, discount: 50, total: 600, status: 'DELIVERED', paymentMethod: 'Card', createdAt: '2026-05-03T09:30:00Z', items: [{ id: '5', quantity: 1, product: { name: 'Deep Cleansing Gel' } }] },
        { id: '5', orderNumber: 'IRTH-000085', customerName: 'Ahmed Khaled', subtotal: 1800, discount: 0, total: 1800, status: 'CONFIRMED', paymentMethod: 'COD', createdAt: '2026-05-02T16:45:00Z', items: [{ id: '6', quantity: 4, product: { name: 'Hydra Moisturizer' } }] },
        { id: '6', orderNumber: 'IRTH-000084', customerName: 'Yasmin Gamal', subtotal: 450, discount: 0, total: 450, status: 'CANCELLED', paymentMethod: 'COD', createdAt: '2026-05-01T12:00:00Z', items: [{ id: '7', quantity: 1, product: { name: 'Radiance Serum' } }] },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const filtered = orders.filter(o => {
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && o.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => ['CONFIRMED', 'PROCESSING', 'IN_PRODUCTION'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === 'SHIPPED').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
        <div className="grid grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}</div>
        {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">{orders.length} total orders</p>
        </div>
        <Link href="/admin/orders/new" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <ShoppingCart className="w-4 h-4" />
          New Order
        </Link>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { label: 'Processing', value: stats.processing, icon: Filter, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Shipped', value: stats.shipped, icon: Truck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Delivered', value: stats.delivered, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setStatusFilter(stat.label === 'Processing' ? '' : stat.label.toUpperCase())}
            className="p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all text-left"
          >
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', stat.bg)}>
              <stat.icon className={cn('w-4 h-4', stat.color)} />
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search by order # or customer name..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Order</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Customer</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Items</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Total</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Payment</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Date</th>
                <th className="text-right text-xs font-semibold text-muted-foreground p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-semibold font-mono">{order.orderNumber}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{order.customerName}</p>
                    {order.customerPhone && <p className="text-xs text-muted-foreground">{order.customerPhone}</p>}
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {order.items.map(i => i.product.name).join(', ')}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-semibold">{formatCurrency(order.total)}</p>
                    {order.discount > 0 && <p className="text-xs text-green-500">-{formatCurrency(order.discount)}</p>}
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-md bg-muted font-medium">{order.paymentMethod || '—'}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn('inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border', getStatusColor(order.status))}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</p>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="p-2 rounded-lg hover:bg-accent transition-colors inline-flex">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
