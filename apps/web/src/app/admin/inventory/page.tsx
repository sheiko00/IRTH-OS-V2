'use client';

import { useState } from 'react';
import { Package, Search, Plus, Filter, AlertCircle, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { INVENTORY_DATA } from '@/components/inventory/inventory-dashboard-data';
import { StockCard, InventoryAlert } from '@/components/inventory/inventory-dashboard-primitives';
import { MetricSeal } from '@/components/founder/founder-dashboard-primitives';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const lowStockItems = INVENTORY_DATA.filter(item => item.status === 'LOW_STOCK');

  return (
    <div className="space-y-10 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2">إدارة المخزون والقطع</h1>
          <p className="text-[#F7F5F0]/50 max-w-md">مراقبة مستويات المخزون اللحظية، تتبع دفعات الإنتاج، وضمان توفر المنتجات الأكثر مبيعاً.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7F5F0]/20 group-focus-within:text-[#C8A96A] transition-colors" />
            <input 
              type="text" 
              placeholder="البحث عن منتج أو SKU..."
              className="bg-[#151515] border border-[#C8A96A]/10 rounded-xl py-3 pr-12 pl-4 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A]/30 w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <Plus className="w-4 h-4" /> إضافة دفعة إنتاج
          </button>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricSeal metric={{ label: "إجمالي الوحدات", value: "١,٨٤٢", note: "تحديث مخزون اليوم", trend: "+٥٪", icon: Package, tone: "gold" }} />
        <MetricSeal metric={{ label: "منتجات قاربت على النفاد", value: lowStockItems.length.toString(), note: "تحتاج إعادة توريد عاجلة", trend: "تنبيه", icon: AlertCircle, tone: "warm" }} />
        <MetricSeal metric={{ label: "إجمالي قيمة المخزون", value: "٤٢٠,٠٠٠ ج.م", note: "القيمة التقديرية للسلع", trend: "مستقر", icon: Layers, tone: "gold" }} />
        <MetricSeal metric={{ label: "معدل دوران المخزون", value: "٤.٢", note: "سرعة حركة المنتجات", trend: "+٠.٨", icon: Package, tone: "green" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inventory Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {['ALL', 'IN_STOCK', 'LOW_STOCK', 'EXPIRING'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-2 text-sm font-bold transition-all border-b-2",
                    activeTab === tab ? "text-[#C8A96A] border-[#C8A96A]" : "text-[#F7F5F0]/30 border-transparent hover:text-[#F7F5F0]/60"
                  )}
                >
                  {tab === 'ALL' ? 'الكل' : tab === 'IN_STOCK' ? 'متوفر' : tab === 'LOW_STOCK' ? 'منخفض' : 'قريب الانتهاء'}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg bg-[#151515] border border-[#C8A96A]/10 text-[#F7F5F0]/40">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INVENTORY_DATA.map(item => (
              <StockCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Inventory Alerts & Intelligence */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#F7F5F0] mb-6">تنبيهات فورية</h3>
            <div className="space-y-4">
              {lowStockItems.map(item => (
                <InventoryAlert key={item.id} alert={item} />
              ))}
              {lowStockItems.length === 0 && (
                <div className="p-10 rounded-3xl border border-dashed border-[#C8A96A]/10 flex flex-col items-center justify-center text-center">
                  <Package className="w-10 h-10 text-[#F7F5F0]/10 mb-4" />
                  <p className="text-sm text-[#F7F5F0]/30">لا توجد تنبيهات حالياً</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/30">
            <h3 className="text-lg font-bold text-[#A9D3B8] mb-2">توقع الطلب القادم</h3>
            <p className="text-xs text-[#F7F5F0]/40 mb-6 leading-relaxed">بناءً على تحليلات الشهر الماضي، يتوقع زيادة في الطلب على "سيروم الإشراق" بنسبة ٢٠٪ خلال الأسبوعين القادمين.</p>
            <button className="w-full py-4 rounded-2xl bg-[#244F3A] text-white font-bold hover:bg-[#1d3f2e] transition-all flex items-center justify-center gap-2">
               طلب تصنيع استباقي <Package className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
