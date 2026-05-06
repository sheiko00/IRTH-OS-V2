'use client';

import { useEffect, useState } from 'react';
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp,
  TrendingDown, AlertTriangle, ArrowUpRight, Clock, Truck
} from 'lucide-react';
import { cn, formatCurrency, getStatusColor } from '@/lib/utils';
import { api } from '@/lib/api';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface DashboardData {
  orders: { total: number; thisMonth: number; lastMonth: number; pending: number };
  revenue: { total: number; thisMonth: number };
  customers: { total: number; newThisMonth: number };
  products: { total: number; active: number; lowStock: number };
}

function KPICard({ title, value, subtitle, icon: Icon, trend, color }: {
  title: string; value: string; subtitle: string;
  icon: any; trend?: number; color: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card hover-lift animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            trend >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          )}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Fetch dashboard analytics
        const analytics = await api.getAnalyticsOverview(token || '');
        
        // Fetch recent orders
        const ordersRes = await api.getOrders(token || '', 'limit=5');
        const orders = ordersRes.data || [];
        
        setData({
          orders: { 
            total: analytics.orders?.total || 0, 
            thisMonth: analytics.orders?.thisMonth || 0,
            lastMonth: analytics.orders?.lastMonth || 0, 
            pending: analytics.orders?.pending || 0 
          },
          revenue: { total: analytics.revenue?.total || 0, thisMonth: analytics.revenue?.thisMonth || 0 },
          customers: { total: analytics.customers?.total || 0, newThisMonth: analytics.customers?.newThisMonth || 0 },
          products: { total: analytics.products?.total || 0, active: analytics.products?.active || 0, lowStock: analytics.products?.lowStock || 0 },
        });
        setRecentOrders(orders);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const monthGrowth = data ? Math.round(((data.orders.thisMonth - data.orders.lastMonth) / data.orders.lastMonth) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to IRTH OS — your commerce operating system.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Revenue"
          value={formatCurrency(data?.revenue.thisMonth || 0)}
          subtitle="This month"
          icon={DollarSign}
          trend={23}
          color="bg-gradient-to-br from-purple-500 to-violet-600"
        />
        <KPICard
          title="Orders"
          value={String(data?.orders.thisMonth || 0)}
          subtitle={`${data?.orders.pending || 0} pending`}
          icon={ShoppingCart}
          trend={monthGrowth}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <KPICard
          title="Customers"
          value={String(data?.customers.total || 0)}
          subtitle={`+${data?.customers.newThisMonth || 0} this month`}
          icon={Users}
          trend={12}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <KPICard
          title="Products"
          value={String(data?.products.active || 0)}
          subtitle={`${data?.products.lowStock || 0} low stock`}
          icon={Package}
          trend={-3}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(order.total)}</p>
                  <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border', getStatusColor(order.status))}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-4">
          {/* Alerts */}
          <div className="rounded-2xl border border-border bg-card p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold mb-4">Alerts</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-500">Low Stock</p>
                  <p className="text-xs text-muted-foreground">7 products below minimum stock</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-500">Pending Orders</p>
                  <p className="text-xs text-muted-foreground">12 orders awaiting confirmation</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                <Truck className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-purple-500">In Transit</p>
                  <p className="text-xs text-muted-foreground">23 shipments being delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border bg-card p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New Order', href: '/admin/orders/new', icon: ShoppingCart },
                { label: 'Add Product', href: '/admin/products/new', icon: Package },
                { label: 'View Reports', href: '/admin/analytics', icon: TrendingUp },
                { label: 'Manage Team', href: '/admin/users', icon: Users },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:bg-accent hover:border-border transition-all text-center group"
                >
                  <action.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">{action.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
