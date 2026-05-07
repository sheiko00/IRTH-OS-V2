'use client';

import { 
  BarChart3, TrendingUp, Users, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Zap, Crown 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MetricSeal } from '@/components/founder/founder-dashboard-primitives';

export default function AnalyticsPage() {
  const topProducts = [
    { name: 'سيروم الإشراق', sold: 342, revenue: 153900, trend: '+١٢٪' },
    { name: 'كريم الترطيب المكثف', sold: 289, revenue: 101150, trend: '+٨٪' },
    { name: 'بخور مديني فاخر', sold: 215, revenue: 60200, trend: '+١٥٪' },
  ];

  return (
    <div className="space-y-10 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2">مركز التحليلات الاستراتيجية</h1>
          <p className="text-[#F7F5F0]/50 max-w-md">تحليل أداء العلامة التجارية، سلوك العملاء، ونمو الحصة السوقية بدقة فائقة.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-2 rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/5 text-[#C8A96A] text-xs font-bold font-sans">
              LAST 30 DAYS
           </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricSeal metric={{ label: "إجمالي المبيعات", value: formatCurrency(456780), note: "إجمالي الإيرادات في آخر ٣٠ يوم", trend: "+٢٣٪", icon: TrendingUp, tone: "gold" }} />
        <MetricSeal metric={{ label: "متوسط قيمة الطلب", value: formatCurrency(366), note: "القيمة المتوسطة لكل عملية شراء", trend: "+٥٪", icon: ShoppingCart, tone: "gold" }} />
        <MetricSeal metric={{ label: "قاعدة العملاء", value: "٣,٤٢٠", note: "إجمالي العملاء المسجلين والنشطين", trend: "+١٢٪", icon: Users, tone: "green" }} />
        <MetricSeal metric={{ label: "معدل التحويل", value: "٣.٨٪", note: "نسبة التحويل من الزيارات لطلبات", trend: "+٠.٤٪", icon: Zap, tone: "green" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Revenue Intelligence */}
        <div className="p-8 rounded-[2.5rem] bg-[#151515] border border-[#C8A96A]/10 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-[#F7F5F0]">نمو الإيرادات الشهري</h3>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#C8A96A]" />
                 <div className="w-3 h-3 rounded-full bg-[#244F3A]" />
              </div>
           </div>
           
           <div className="h-64 flex items-end gap-3 md:gap-4 pb-4 border-b border-[#C8A96A]/10">
              {[40, 55, 45, 70, 60, 85, 75, 95, 80, 100, 90, 110].map((v, i) => (
                <div key={i} className="flex-1 group/bar relative">
                   <div 
                      className="w-full bg-gradient-to-t from-[#C8A96A]/20 to-[#C8A96A] rounded-t-lg transition-all duration-700 hover:scale-x-110" 
                      style={{ height: `${(v/110)*100}%` }}
                   >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#C8A96A] text-[#0D0D0D] text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                         {v}k
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-6 flex justify-between px-2">
              {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => (
                <span key={m} className="text-[10px] text-[#F7F5F0]/20 font-bold">{m}</span>
              ))}
           </div>
        </div>

        {/* Top Performing Assets */}
        <div className="p-8 rounded-[2.5rem] bg-[#151515] border border-[#C8A96A]/10 relative overflow-hidden">
           <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">المنتجات الأكثر تأثيراً</h3>
           <div className="space-y-6">
              {topProducts.map((p, i) => (
                <div key={p.name} className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-[#C8A96A]/10 hover:bg-[#0D0D0D]/40 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] font-bold">
                         {i + 1}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-[#F7F5F0]">{p.name}</p>
                         <p className="text-[10px] text-[#F7F5F0]/30">{p.sold} وحدة مباعة</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-bold text-[#C8A96A]">{formatCurrency(p.revenue)}</p>
                      <span className="text-[10px] text-[#A9D3B8] font-bold">{p.trend}</span>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-10 p-6 rounded-2xl bg-[#C8A96A]/5 border border-[#C8A96A]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Crown className="w-6 h-6 text-[#C8A96A]" />
                 <div>
                    <p className="text-xs font-bold text-[#F7F5F0]">المنتج النجم (Star Product)</p>
                    <p className="text-[10px] text-[#F7F5F0]/40">سيروم الإشراق يحقق أعلى ROAS</p>
                 </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#C8A96A]" />
           </div>
        </div>
      </div>
    </div>
  );
}
