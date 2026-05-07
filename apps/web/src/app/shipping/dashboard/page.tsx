'use client';

import { useState, useEffect } from 'react';
import { 
  Truck, CheckCircle2, Clock, MapPin, 
  Search, ArrowLeft, History, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocket } from '@/hooks/use-socket';
import { LOGISTICS_SHIPMENTS } from '@/components/logistics/logistics-dashboard-data';
import { ShipmentCard } from '@/components/logistics/logistics-dashboard-primitives';

export default function ShippingPartnerDashboard() {
  const [mounted, setMounted] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { isConnected } = useSocket(token || undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-8 md:p-12 font-serif rtl" dir="rtl">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#244F3A]/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-[#F7F5F0]">بوابة شريك الشحن</h1>
              <div className={cn(
                "px-3 py-1 rounded-full border flex items-center gap-2",
                isConnected ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase">
                  {isConnected ? 'Active Node' : 'Offline'}
                </span>
              </div>
            </div>
            <p className="text-[#F7F5F0]/50">أهلاً بك، فريق بوسطة اللوجستي. تابع شحنات إرث لحظة بلحظة.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-[#151515] border border-[#C8A96A]/10 text-[#F7F5F0]/40 hover:text-[#C8A96A] transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all">
              تحديث حالة جماعي
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'شحنات بانتظار الاستلام', value: '١٢', icon: Clock, color: '#C8A96A' },
            { label: 'شحنات قيد التوصيل', value: '٤٥', icon: Truck, color: '#3b82f6' },
            { label: 'تم تسليمها اليوم', value: '٢٨', icon: CheckCircle2, color: '#10b981' },
            { label: 'طلبات المرتجعات', value: '١', icon: History, color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#151515] border border-[#C8A96A]/10 hover:border-[#C8A96A]/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#C8A96A]/5" style={{ color: stat.color }}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#F7F5F0] mb-1 font-sans">{stat.value}</h3>
              <p className="text-[10px] text-[#F7F5F0]/30 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Shipments */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#C8A96A]">الشحنات النشطة</h2>
              <div className="relative group">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7F5F0]/20" />
                <input 
                  type="text" 
                  placeholder="رقم الشحنة..."
                  className="bg-[#151515] border border-[#C8A96A]/10 rounded-lg py-2 pr-10 pl-4 text-xs text-[#F7F5F0] w-48 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LOGISTICS_SHIPMENTS.map(s => (
                <ShipmentCard key={s.id} shipment={s} />
              ))}
            </div>
          </div>

          {/* Action Logs & Support */}
          <div className="space-y-8">
             <div>
               <h2 className="text-xl font-bold text-[#F7F5F0] mb-6">سجل العمليات الأخير</h2>
               <div className="space-y-4">
                 {[
                   { t: 'تحديث حالة', m: 'تم تغيير حالة الشحنة IRTH-LOG-8822 إلى "في الطريق"', d: 'منذ ٢ دقيقة' },
                   { t: 'استلام ناجح', m: 'تم استلام ٥ شحنات من المستودع الرئيسي', d: 'منذ ساعة' },
                 ].map((log, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-[#C8A96A]/5 bg-[#151515]/40">
                     <p className="text-[10px] font-bold text-[#C8A96A] mb-1 uppercase tracking-widest">{log.t}</p>
                     <p className="text-xs text-[#F7F5F0]/60 mb-2 leading-relaxed">{log.m}</p>
                     <span className="text-[9px] text-[#F7F5F0]/20">{log.d}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/30">
               <h3 className="text-lg font-bold text-[#A9D3B8] mb-2">الدعم الفني والعمليات</h3>
               <p className="text-xs text-[#F7F5F0]/40 mb-6 leading-relaxed">تواصل مباشرة مع فريق إدارة العمليات في إرث لحل أي مشكلات لوجستية.</p>
               <button className="w-full py-4 rounded-2xl bg-[#244F3A] text-white font-bold hover:bg-[#1d3f2e] transition-all flex items-center justify-center gap-2">
                 فتح تذكرة دعم <ArrowLeft className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
