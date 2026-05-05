'use client';
import { useState } from 'react';
import { Megaphone, Tag, Users, Plus, TrendingUp, Eye, MousePointer } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default function MarketingPage() {
  const [tab, setTab] = useState<'campaigns'|'coupons'|'influencers'>('campaigns');
  const campaigns = [
    { id:'1', name:'Summer Launch', channel:'INSTAGRAM', status:'ACTIVE', budget:15000, spent:8200, kpi:{ impressions:45000, clicks:1200, ctr:2.67, revenue:32000 } },
    { id:'2', name:'Ramadan Sale', channel:'FACEBOOK', status:'COMPLETED', budget:10000, spent:9800, kpi:{ impressions:120000, clicks:4500, ctr:3.75, revenue:85000 } },
    { id:'3', name:'Influencer Push', channel:'TIKTOK', status:'DRAFT', budget:20000, spent:0, kpi:{ impressions:0, clicks:0, ctr:0, revenue:0 } },
  ];
  const coupons = [
    { id:'1', code:'SUMMER25', discountType:'PERCENTAGE', discountValue:25, usageCount:45, usageLimit:100, isActive:true },
    { id:'2', code:'FREESHIP', discountType:'FIXED', discountValue:60, usageCount:120, usageLimit:null, isActive:true },
    { id:'3', code:'VIP50', discountType:'PERCENTAGE', discountValue:50, usageCount:5, usageLimit:10, isActive:false },
  ];
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Marketing</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25"><Plus className="w-4 h-4" />New Campaign</button>
      </div>
      <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
        {(['campaigns','coupons','influencers'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',tab===t?'bg-background shadow-sm':'text-muted-foreground hover:text-foreground')}>{t}</button>
        ))}
      </div>
      {tab==='campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map(c=>(
            <div key={c.id} className="p-6 rounded-2xl border border-border bg-card hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div><h3 className="font-semibold">{c.name}</h3><p className="text-xs text-muted-foreground">{c.channel}</p></div>
                <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold border',c.status==='ACTIVE'?'bg-green-500/10 text-green-500 border-green-500/20':c.status==='COMPLETED'?'bg-blue-500/10 text-blue-500 border-blue-500/20':'bg-gray-500/10 text-gray-500 border-gray-500/20')}>{c.status}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Budget</span><span className="font-medium">{formatCurrency(c.budget)}</span></div>
                <div className="w-full h-2 bg-muted rounded-full"><div className="h-full bg-purple-500 rounded-full" style={{width:`${(c.spent/c.budget)*100}%`}}/></div>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Spent: {formatCurrency(c.spent)}</span><span>{Math.round((c.spent/c.budget)*100)}%</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2"><Eye className="w-3 h-3 text-muted-foreground"/><div><p className="text-xs text-muted-foreground">Impressions</p><p className="text-sm font-bold">{(c.kpi.impressions/1000).toFixed(0)}K</p></div></div>
                <div className="flex items-center gap-2"><MousePointer className="w-3 h-3 text-muted-foreground"/><div><p className="text-xs text-muted-foreground">CTR</p><p className="text-sm font-bold">{c.kpi.ctr}%</p></div></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==='coupons' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Code</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Discount</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Usage</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
            </tr></thead>
            <tbody>{coupons.map(c=>(
              <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="p-4"><span className="font-mono text-sm font-bold">{c.code}</span></td>
                <td className="p-4"><span className="text-sm">{c.discountType==='PERCENTAGE'?`${c.discountValue}%`:formatCurrency(c.discountValue)}</span></td>
                <td className="p-4"><span className="text-sm">{c.usageCount}{c.usageLimit?` / ${c.usageLimit}`:''}</span></td>
                <td className="p-4"><span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold',c.isActive?'bg-green-500/10 text-green-500':'bg-gray-500/10 text-gray-500')}>{c.isActive?'Active':'Inactive'}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {tab==='influencers' && <div className="text-center py-12 text-muted-foreground"><Users className="w-10 h-10 mx-auto mb-3 opacity-50"/><p>No influencers added yet</p></div>}
    </div>
  );
}
