'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { OrderStage, OperationalQueue } from './operations-dashboard-data';
import { Clock, MapPin, ChevronLeft } from 'lucide-react';

export function OrderPipelineCard({ order }: { order: OrderStage }) {
  return (
    <div className="group p-4 rounded-2xl border border-[#C8A96A]/8 bg-[#151515]/60 hover:border-[#C8A96A]/30 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[11px] font-bold text-[#C8A96A] tracking-wider">{order.orderNumber}</span>
        <span className="text-[10px] text-[#F7F5F0]/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</span>
      </div>
      <p className="text-sm font-bold text-[#F7F5F0] mb-1">{order.customerName}</p>
      <div className="flex items-center justify-between pt-3 border-t border-[#C8A96A]/5">
        <span className="text-xs font-bold text-[#A9D3B8]">{formatCurrency(order.total)}</span>
        <button className="text-[10px] text-[#C8A96A] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          التفاصيل <ChevronLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function QueueLane({ queue }: { queue: OperationalQueue }) {
  const Icon = queue.icon;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#C8A96A]/5" style={{ color: queue.color }}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#F7F5F0]">{queue.title}</h3>
        </div>
        <span className="font-sans text-[11px] font-bold text-[#F7F5F0]/30 bg-[#F7F5F0]/5 px-2 py-0.5 rounded-full">{queue.items.length}</span>
      </div>
      <div className="space-y-4">
        {queue.items.map(order => (
          <OrderPipelineCard key={order.id} order={order} />
        ))}
        {queue.items.length === 0 && (
          <div className="h-32 rounded-2xl border border-dashed border-[#C8A96A]/10 flex items-center justify-center">
            <p className="text-[10px] text-[#F7F5F0]/20 uppercase tracking-widest">فارغ حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
