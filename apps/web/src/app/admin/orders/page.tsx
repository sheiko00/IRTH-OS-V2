'use client';

import { useState } from 'react';
import { ShoppingBag, Search, Filter, Plus, AlertCircle, Package, Truck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ordersQueue, inventoryAlerts } from '@/components/operations/operations-dashboard-data';
import { QueueLane } from '@/components/operations/operations-dashboard-primitives';
import { FounderPanel, MetricSeal } from '@/components/founder/founder-dashboard-primitives';

export default function OrdersPage() {
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline');

  return (
    <div className="space-y-8 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2">إدارة العمليات والطلبات</h1>
          <p className="text-[#F7F5F0]/60">متابعة مسار الطلبات، حالة المخزون، والعمليات اللوجستية.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <Plus className="w-4 h-4" /> طلب جديد
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricSeal metric={{ label: 'طلبات اليوم', value: '١٤', note: 'بانتظار المعالجة', trend: '+٥', icon: ShoppingBag, tone: 'gold' }} />
        <MetricSeal metric={{ label: 'في التجهيز', value: '٢٨', note: 'داخل المستودعات', trend: 'نشط', icon: Package, tone: 'warm' }} />
        <MetricSeal metric={{ label: 'قيد الشحن', value: '١٢', note: 'مع شركات الخدمات اللوجستية', trend: 'في الموعد', icon: Truck, tone: 'green' }} />
        <MetricSeal metric={{ label: 'تم التسليم', value: '١٥٤', note: 'إجمالي الشهر الحالي', trend: '+١٢٪', icon: CheckCircle2, tone: 'green' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Pipeline Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 p-1 bg-[#151515] border border-[#C8A96A]/10 rounded-2xl w-fit">
              <button
                onClick={() => setView('pipeline')}
                className={cn(
                  'px-6 py-2 rounded-xl text-sm font-bold transition-all',
                  view === 'pipeline' ? 'bg-[#C8A96A] text-[#0D0D0D]' : 'text-[#F7F5F0]/40 hover:text-[#C8A96A]'
                )}
              >
                المسار المرئي
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  'px-6 py-2 rounded-xl text-sm font-bold transition-all',
                  view === 'list' ? 'bg-[#C8A96A] text-[#0D0D0D]' : 'text-[#F7F5F0]/40 hover:text-[#C8A96A]'
                )}
              >
                جدول البيانات
              </button>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7F5F0]/20" />
                <input 
                  type="text" 
                  placeholder="بحث سريع..." 
                  className="bg-[#151515] border border-[#C8A96A]/10 rounded-xl py-2 px-10 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A] transition-all" 
                />
              </div>
              <button className="p-2.5 rounded-xl border border-[#C8A96A]/10 text-[#F7F5F0]/40 hover:text-[#C8A96A] hover:bg-[#C8A96A]/5 transition-all">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {view === 'pipeline' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-[#151515]/30 border border-[#C8A96A]/5 rounded-[2.5rem]">
              {ordersQueue.map((queue, i) => (
                <QueueLane key={i} queue={queue} />
              ))}
            </div>
          ) : (
            <FounderPanel title="جميع الطلبات" meta="DATABASE">
               <div className="p-12 text-center text-[#F7F5F0]/20">
                 <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                 <p className="font-serif text-lg">جدول البيانات قيد التحسين</p>
               </div>
            </FounderPanel>
          )}
        </div>

        {/* Operational Alerts Side Panel */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#F7F5F0] mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> تنبيهات تشغيلية
            </h2>
            <div className="space-y-4">
              {inventoryAlerts.map(alert => (
                <div key={alert.id} className={cn(
                  "p-5 rounded-2xl border relative overflow-hidden group",
                  alert.status === 'LOW' ? "border-[#C8A96A]/20 bg-[#C8A96A]/5" : "border-red-500/20 bg-red-500/5"
                )}>
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    alert.status === 'LOW' ? "bg-[#C8A96A]" : "bg-red-500"
                  )} />
                  <p className="text-sm font-bold text-[#F7F5F0] mb-1">{alert.item}</p>
                  <p className="text-xs text-[#F7F5F0]/40 mb-4">المخزون الحالي: {alert.stock}</p>
                  <button className={cn(
                    "w-full py-2 rounded-lg text-[10px] font-bold transition-all",
                    alert.status === 'LOW' ? "bg-[#C8A96A]/10 text-[#C8A96A] hover:bg-[#C8A96A]/20" : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  )}>
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/30">
            <h3 className="text-sm font-bold text-[#244F3A] mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4" /> كفاءة الشحن
            </h3>
            <p className="text-[11px] text-[#F7F5F0]/40 mb-4">متوسط زمن التوصيل هذا الأسبوع: ١.٤ يوم (أفضل من المعتاد).</p>
            <div className="h-1.5 w-full bg-[#F7F5F0]/5 rounded-full overflow-hidden">
               <div className="h-full bg-[#244F3A] w-[٨٥٪] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
