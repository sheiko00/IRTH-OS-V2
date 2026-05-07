'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Truck, MapPin, Search, Plus, Filter } from 'lucide-react';
import { LOGISTICS_SHIPMENTS, LOGISTICS_ALERTS } from '@/components/logistics/logistics-dashboard-data';
import { ShipmentCard, LogisticsAlertCard } from '@/components/logistics/logistics-dashboard-primitives';
import { MetricSeal } from '@/components/founder/founder-dashboard-primitives';

export default function ShippingPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  return (
    <div className="space-y-10 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header / Command Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2">مركز الخدمات اللوجستية</h1>
          <p className="text-[#F7F5F0]/50 max-w-md">إدارة حركة الشحنات، تتبع المسارات العالمية، وضمان دقة التوصيل في الموعد.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7F5F0]/20 group-focus-within:text-[#C8A96A] transition-colors" />
            <input 
              type="text" 
              placeholder="البحث برقم التتبع..."
              className="bg-[#151515] border border-[#C8A96A]/10 rounded-xl py-3 pr-12 pl-4 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A]/30 w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <Plus className="w-4 h-4" /> إنشاء شحنة
          </button>
        </div>
      </div>

      {/* Logistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricSeal metric={{ label: "إجمالي الشحنات", value: "١,٢٤٠", note: "بناءً على طلبات الموزعين والعملاء", trend: "+١٤٪", icon: Truck, tone: "gold" }} />
        <MetricSeal metric={{ label: "قيد التوصيل", value: "٨٦", note: "شحنات في المرحلة النهائية", trend: "نشط", icon: Truck, tone: "green" }} />
        <MetricSeal metric={{ label: "تأخيرات محتملة", value: "٣", note: "بسبب عوائق لوجستية خارجية", trend: "-٢", icon: Truck, tone: "warm" }} />
        <MetricSeal metric={{ label: "متوسط وقت التوصيل", value: "٢.٤ يوم", note: "أداء شركة الشحن المتعاقد معها", trend: "-٠.٥", icon: Truck, tone: "green" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Shipments Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {['ALL', 'IN_TRANSIT', 'PENDING', 'DELIVERED'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-2 text-sm font-bold transition-all border-b-2",
                    activeTab === tab ? "text-[#C8A96A] border-[#C8A96A]" : "text-[#F7F5F0]/30 border-transparent hover:text-[#F7F5F0]/60"
                  )}
                >
                  {tab === 'ALL' ? 'الكل' : tab === 'IN_TRANSIT' ? 'في الطريق' : tab === 'PENDING' ? 'معلق' : 'تم التوصيل'}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg bg-[#151515] border border-[#C8A96A]/10 text-[#F7F5F0]/40">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOGISTICS_SHIPMENTS.map(shipment => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>

        {/* Operational Intelligence */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#F7F5F0] mb-6">ذكاء العمليات</h3>
            <div className="space-y-4">
              {LOGISTICS_ALERTS.map(alert => (
                <LogisticsAlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Map Visual Placeholder */}
          <div className="rounded-3xl border border-[#C8A96A]/10 bg-[#151515] overflow-hidden relative group">
            <div className="absolute inset-0 bg-pattern-islamic opacity-5 group-hover:scale-110 transition-transform duration-[20s] linear" />
            <div className="p-8 relative z-10">
              <h4 className="text-sm font-bold text-[#C8A96A] mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> خريطة التوزيع اللحظية
              </h4>
              <div className="h-48 flex items-center justify-center border border-dashed border-[#C8A96A]/20 rounded-2xl bg-[#0D0D0D]/40 backdrop-blur-sm">
                <p className="text-[10px] text-[#F7F5F0]/20 uppercase tracking-[0.3em]">تحميل بيانات الـ GPS...</p>
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-[#F7F5F0]/30 uppercase">المنطقة الأكثر نشاطاً</p>
                  <p className="text-sm font-bold text-[#F7F5F0]">وسط الرياض (الحي الدبلوماسي)</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] bg-[#C8A96A]/10">
                  <Truck className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
