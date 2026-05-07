'use client';

import { cn } from '@/lib/utils';
import { Shipment, LogisticsAlert } from './logistics-dashboard-data';
import { Truck, MapPin, Clock, ArrowLeft, AlertCircle } from 'lucide-react';

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#C8A96A]/12 bg-[#0D0D0D]/72 p-6 transition duration-500 hover:border-[#C8A96A]/30">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C8A96A]/25 bg-[#C8A96A]/10 text-[#C8A96A]">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0] tracking-wider">{shipment.trackingNumber}</h3>
            <p className="text-[10px] text-[#F7F5F0]/30 uppercase tracking-widest">{shipment.carrier}</p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[9px] font-bold tracking-wider border",
          shipment.status === 'IN_TRANSIT' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
          shipment.status === 'DELIVERED' ? "bg-[#244F3A]/20 text-[#A9D3B8] border-[#244F3A]/40" :
          "bg-[#F7F5F0]/5 text-[#F7F5F0]/40 border-[#F7F5F0]/10"
        )}>
          {shipment.status}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-xs text-[#F7F5F0]/60">
          <MapPin className="w-4 h-4 text-[#C8A96A]" />
          <span>{shipment.destination}</span>
        </div>
        {shipment.location && (
          <div className="p-3 rounded-xl bg-[#C8A96A]/5 border border-[#C8A96A]/10 flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] animate-pulse" />
             <p className="text-[11px] text-[#C8A96A]/80">{shipment.location}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#C8A96A]/10">
        <div className="flex items-center gap-2 text-[10px] text-[#F7F5F0]/30 font-sans">
          <Clock className="w-3 h-3" />
          {shipment.updatedAt}
        </div>
        <button className="text-[10px] font-bold text-[#C8A96A] flex items-center gap-1 hover:gap-2 transition-all">
          تتبع الرحلة <ArrowLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function LogisticsAlertCard({ alert }: { alert: LogisticsAlert }) {
  const color = alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-orange-500' : 'text-[#C8A96A]';
  const bg = alert.severity === 'high' ? 'bg-red-500/10' : alert.severity === 'medium' ? 'bg-orange-500/10' : 'bg-[#C8A96A]/10';
  
  return (
    <div className={cn("p-5 rounded-2xl border border-white/5 bg-[#151515] relative overflow-hidden group", bg)}>
      <div className="flex items-start gap-4">
        <div className={cn("p-2 rounded-lg", bg, color)}>
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={cn("text-sm font-bold mb-1", color)}>{alert.title}</h4>
          <p className="text-xs text-[#F7F5F0]/50 leading-relaxed">{alert.message}</p>
        </div>
      </div>
    </div>
  );
}
