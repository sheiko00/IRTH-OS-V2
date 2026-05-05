'use client';

import { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, CheckCircle2, Plus } from 'lucide-react';
import { cn, getStatusColor, formatDateTime } from '@/lib/utils';

export default function ShippingPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShipments([
        { id: '1', trackingNumber: 'IRTH-SH-000023', carrier: 'Bosta', status: 'IN_TRANSIT', order: { orderNumber: 'IRTH-000089', customerName: 'Nour Ahmed' }, events: [{ status: 'IN_TRANSIT', location: 'Cairo Hub', createdAt: '2026-05-05T16:00:00Z' }] },
        { id: '2', trackingNumber: 'IRTH-SH-000022', carrier: 'Bosta', status: 'DELIVERED', order: { orderNumber: 'IRTH-000086', customerName: 'Fatima Omar' }, events: [{ status: 'DELIVERED', location: 'Alexandria', createdAt: '2026-05-04T14:00:00Z' }] },
        { id: '3', trackingNumber: 'IRTH-SH-000021', carrier: 'Aramex', status: 'PENDING', order: { orderNumber: 'IRTH-000085', customerName: 'Ahmed Khaled' }, events: [] },
      ]);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}</div>;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shipping</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25"><Plus className="w-4 h-4" /> Create Shipment</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ l: 'Pending', v: shipments.filter(s=>s.status==='PENDING').length, i: Clock, c: 'text-yellow-500', b: 'bg-yellow-500/10' },
          { l: 'In Transit', v: shipments.filter(s=>s.status==='IN_TRANSIT').length, i: Truck, c: 'text-blue-500', b: 'bg-blue-500/10' },
          { l: 'Delivered', v: shipments.filter(s=>s.status==='DELIVERED').length, i: CheckCircle2, c: 'text-green-500', b: 'bg-green-500/10' }
        ].map(s=>(
          <div key={s.l} className="p-5 rounded-2xl border border-border bg-card">
            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-2',s.b)}><s.i className={cn('w-4 h-4',s.c)} /></div>
            <p className="text-xl font-bold">{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {shipments.map(s=>(
          <div key={s.id} className="p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', s.status==='DELIVERED'?'bg-green-500/10':s.status==='IN_TRANSIT'?'bg-blue-500/10':'bg-yellow-500/10')}>
                  <Truck className={cn('w-5 h-5', s.status==='DELIVERED'?'text-green-500':s.status==='IN_TRANSIT'?'text-blue-500':'text-yellow-500')} />
                </div>
                <div>
                  <p className="text-sm font-semibold font-mono">{s.trackingNumber}</p>
                  <p className="text-xs text-muted-foreground">Order: {s.order.orderNumber} • {s.order.customerName}</p>
                </div>
              </div>
              <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold border', getStatusColor(s.status))}>{s.status.replace('_',' ')}</span>
            </div>
            {s.events[0]?.location && <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />Last: {s.events[0].location} — {formatDateTime(s.events[0].createdAt)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
