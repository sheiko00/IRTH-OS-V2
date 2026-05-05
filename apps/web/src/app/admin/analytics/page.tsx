'use client';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const kpis = [
    { label:'Total Revenue', value: formatCurrency(456780), change:'+23%', icon: DollarSign, color:'bg-gradient-to-br from-purple-500 to-violet-600' },
    { label:'Total Orders', value:'1,247', change:'+17%', icon: ShoppingCart, color:'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { label:'Customers', value:'3,420', change:'+12%', icon: Users, color:'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { label:'Avg Order Value', value: formatCurrency(366), change:'+5%', icon: TrendingUp, color:'bg-gradient-to-br from-amber-500 to-orange-600' },
  ];
  const topProducts = [
    { name:'Radiance Serum', sold:342, revenue:153900 },
    { name:'Hydra Moisturizer', sold:289, revenue:101150 },
    { name:'Deep Cleansing Gel', sold:215, revenue:60200 },
    { name:'Vitamin C Toner', sold:198, revenue:43560 },
    { name:'Body Lotion Luxe', sold:156, revenue:29640 },
  ];
  const maxSold = topProducts[0]?.sold || 1;

  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k=>(
          <div key={k.label} className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${k.color} flex items-center justify-center`}><k.icon className="w-5 h-5 text-white"/></div>
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{k.change}</span>
            </div>
            <p className="text-2xl font-bold">{k.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{k.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart Placeholder */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-48 flex items-end gap-2">
            {[28,35,42,38,55,48,62,58,71,65,80,75].map((v,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-purple-500/80 rounded-t-md transition-all hover:bg-purple-500" style={{height:`${(v/80)*100}%`}}/>
                <span className="text-[9px] text-muted-foreground">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Top Products */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((p,i)=>(
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground w-5">{i+1}</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><Package className="w-4 h-4 text-purple-500"/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full mt-1"><div className="h-full bg-purple-500 rounded-full" style={{width:`${(p.sold/maxSold)*100}%`}}/></div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatCurrency(p.revenue)}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
