'use client';

import { cn } from '@/lib/utils';
import { InventoryItem } from './inventory-dashboard-data';
import { Package, AlertTriangle, Clock, ArrowLeft } from 'lucide-react';

export function StockCard({ item }: { item: InventoryItem }) {
  const isLow = item.status === 'LOW_STOCK';
  const progress = Math.min(100, (item.quantity / (item.minStock * 2)) * 100);
  
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#C8A96A]/12 bg-[#0D0D0D]/72 p-6 transition duration-500 hover:border-[#C8A96A]/30">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border transition-all",
            isLow ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-[#C8A96A]/10 border-[#C8A96A]/25 text-[#C8A96A]"
          )}>
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0]">{item.name}</h3>
            <p className="text-[10px] text-[#F7F5F0]/30 font-sans tracking-widest">{item.sku}</p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-bold tracking-wider border",
          isLow ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-[#244F3A]/20 text-[#A9D3B8] border-[#244F3A]/40"
        )}>
          {item.status}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-xs font-bold">
           <span className="text-[#F7F5F0]/40">مستوى المخزون</span>
           <span className={isLow ? "text-red-500" : "text-[#C8A96A]"}>{item.quantity} وحدة</span>
        </div>
        <div className="h-1.5 w-full bg-[#F7F5F0]/5 rounded-full overflow-hidden">
           <div 
              className={cn("h-full rounded-full transition-all duration-1000", isLow ? "bg-red-500" : "bg-[#C8A96A]")} 
              style={{ width: `${progress}%` }} 
           />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#C8A96A]/10">
        <p className="text-[10px] text-[#F7F5F0]/30">نقطة إعادة الطلب: {item.minStock}</p>
        <button className="text-[10px] font-bold text-[#C8A96A] flex items-center gap-1 hover:gap-2 transition-all">
          إدارة المخزون <ArrowLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function InventoryAlert({ alert }: { alert: any }) {
  return (
    <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center gap-4 group">
       <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
          <AlertTriangle className="w-5 h-5" />
       </div>
       <div className="flex-1">
          <h4 className="text-sm font-bold text-[#F7F5F0]">{alert.name}</h4>
          <p className="text-xs text-[#F7F5F0]/40">المخزون الحالي ({alert.quantity}) أقل من الحد الأدنى ({alert.minStock})</p>
       </div>
       <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          إصدار أمر توريد
       </button>
    </div>
  );
}
