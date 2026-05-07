'use client';

import { useState } from 'react';
import { 
  Truck, Package, ShoppingBag, Calendar, 
  MapPin, AlertTriangle, CheckCircle2, Clock,
  ArrowLeft, Search, Bell, Crown, Settings,
  Users, BarChart3, Factory, Layers, Filter, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function OperationsBoardPage() {
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. MAIN SIDEBAR */}
      <aside className="w-20 flex flex-col items-center py-8 border-l border-[#C8A96A]/10 bg-[#0A0A0A] z-50">
        <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] mb-12">
          <Crown className="w-6 h-6" />
        </div>
        <nav className="flex-1 flex flex-col gap-8">
           <button className="p-3 text-[#C8A96A] bg-[#C8A96A]/10 rounded-xl"><Truck className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><LayoutDashboard className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><Factory className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><Layers className="w-6 h-6" /></button>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#244F3A] to-[#1d3f2e] border border-[#244F3A]/40 flex items-center justify-center text-[#A9D3B8] font-bold text-xs">ع</div>
           <p className="text-[10px] text-[#A9D3B8] uppercase tracking-widest font-bold">العمليات</p>
        </div>
      </aside>

      {/* 02. MODULE SIDEBAR (Operations Sub-nav) */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0D0D0D] flex flex-col p-6 z-40">
        <div className="mb-10">
           <h2 className="text-xl font-bold tracking-tight text-[#F7F5F0]">غرفة العمليات</h2>
           <p className="text-[9px] text-[#C8A96A] uppercase tracking-[0.3em] mt-1">التحكم اللحظي بالإمداد</p>
        </div>
        
        <div className="space-y-4">
           <CodexSidebarItem icon={LayoutDashboard} label="لوحة التحكم" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
           <CodexSidebarItem icon={ShoppingBag} label="الطلبات" isActive={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} />
           <CodexSidebarItem icon={BoxIcon} label="المحتوى" />
           <CodexSidebarItem icon={Users} label="المؤثرين" />
           <CodexSidebarItem icon={Calendar} label="التقويم" />
           <CodexSidebarItem icon={DollarSign} label="الميزانية" />
           <CodexSidebarItem icon={BarChart3} label="التقارير" />
           <CodexSidebarItem icon={Settings} label="الإعدادات" />
        </div>

        <div className="mt-auto">
           <div className="p-5 rounded-2xl border border-[#C8A96A]/10 bg-[#151515] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A96A]" />
              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">المستودع الرئيسي</p>
              <p className="text-xs text-[#F7F5F0]/60">الحالة: نشط جداً</p>
           </div>
        </div>
      </aside>

      {/* 03. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[900px] h-[700px] border border-[#C8A96A]/5 rounded-t-full -z-10 opacity-10 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto space-y-12">
            {/* Header: Operations Room */}
            <div className="flex items-end justify-between border-b border-[#C8A96A]/10 pb-10">
               <div>
                  <div className="flex items-center gap-4 mb-2 text-[#C8A96A]">
                     <div className="w-10 h-10 rounded-full border border-[#C8A96A]/20 flex items-center justify-center bg-[#C8A96A]/5">
                        <Truck className="w-5 h-5" />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-[0.4em]">Operational Chamber</span>
                  </div>
                  <h1 className="text-5xl font-bold text-[#F7F5F0]">غرفة العمليات</h1>
                  <p className="text-[#F7F5F0]/40 mt-4 max-w-lg leading-relaxed">
                     إدارة الطلبات، التوريد، والشحن في الوقت الحقيقي. ضمان الجودة في كل خطوة من المختبر إلى العميل.
                  </p>
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="text-left">
                     <p className="text-sm font-bold text-[#F7F5F0]">جميع المستودعات</p>
                     <p className="text-[10px] text-[#C8A96A] uppercase tracking-widest">المملكة العربية السعودية</p>
                  </div>
                  <button className="p-3 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 text-[#C8A96A]">
                     <Filter className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* Operations Pulse (Big Icon Metrics) */}
            <div className="grid grid-cols-4 gap-4 p-8 rounded-[3rem] border border-[#C8A96A]/15 bg-[#151515]/30 backdrop-blur-xl">
               <div className="flex flex-col items-center border-l border-[#C8A96A]/10">
                  <div className="w-14 h-14 rounded-2xl bg-[#C8A96A]/10 flex items-center justify-center text-[#C8A96A] mb-4">
                     <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold font-sans">٣١٢</p>
                  <p className="text-[10px] text-[#F7F5F0]/30 font-bold uppercase tracking-widest mt-1">الطلبات اليوم</p>
               </div>
               <div className="flex flex-col items-center border-l border-[#C8A96A]/10">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                     <Clock className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold font-sans">٥٨</p>
                  <p className="text-[10px] text-[#F7F5F0]/30 font-bold uppercase tracking-widest mt-1">قيد التجهيز</p>
               </div>
               <div className="flex flex-col items-center border-l border-[#C8A96A]/10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                     <Truck className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold font-sans">٣٧</p>
                  <p className="text-[10px] text-[#F7F5F0]/30 font-bold uppercase tracking-widest mt-1">جاهز للشحن</p>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#244F3A]/30 flex items-center justify-center text-[#A9D3B8] mb-4">
                     <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold font-sans text-[#A9D3B8]">٢١٦</p>
                  <p className="text-[10px] text-[#F7F5F0]/30 font-bold uppercase tracking-widest mt-1">تم التسليم</p>
               </div>
            </div>

            {/* Order Flow Pipeline */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#F7F5F0] flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[#C8A96A]" /> مسار الطلبات
                  </h3>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-[#C8A96A] uppercase tracking-[0.2em] hover:opacity-70 transition-all">
                     عرض جميع الطلبات <ArrowLeft className="w-4 h-4" />
                  </button>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-10 no-scrollbar">
                  <CodexPathStep count={1} label="طلب جديد" items={[{ title: 'طلب #١٢٦٠', status: 'منذ ٢ دقيقة' }, { title: 'طلب #١٢٥٩', status: 'منذ ٥ دقائق' }]} />
                  <CodexPathStep count={2} label="تجهيز" isActive items={[{ title: 'طلب #١٢٥٨', status: 'تجهيز' }, { title: 'طلب #١٢٥٧', status: 'تغليف' }]} />
                  <CodexPathStep count={3} label="إنتاج" items={[{ title: 'طلب #١٢٥٠', status: 'بانتظار المورد' }]} />
                  <CodexPathStep count={4} label="جاهز" items={[{ title: 'طلب #١٢٤٠', status: 'جاهز للشحن' }]} />
                  <CodexPathStep count={5} label="شحن" items={[{ title: 'طلب #١٢٣٨', status: 'بيد المندوب' }]} />
                  <CodexPathStep count={6} label="تم التسليم" isCompleted items={[{ title: 'طلب #١٢١٠', status: 'نجاح' }]} />
               </div>
            </div>

            {/* Logistics & Inventory Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Inventory Health */}
               <div className="p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 flex flex-col">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">حالة المخزون</h3>
                  <div className="space-y-6 flex-1">
                     <div className="flex items-center justify-between p-4 rounded-2xl bg-[#C8A96A]/5 border border-[#C8A96A]/10">
                        <div className="flex items-center gap-3">
                           <Package className="w-5 h-5 text-[#C8A96A]" />
                           <p className="text-sm font-bold">المنتجات الكاملة</p>
                        </div>
                        <p className="text-lg font-bold">١,٢٤٨</p>
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-3">
                           <AlertTriangle className="w-5 h-5 text-red-500" />
                           <p className="text-sm font-bold text-red-500">مخزون منخفض</p>
                        </div>
                        <p className="text-lg font-bold text-red-500">٢٣</p>
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                        <div className="flex items-center gap-3">
                           <Layers className="w-5 h-5 text-orange-500" />
                           <p className="text-sm font-bold text-orange-500">نفاد قريب</p>
                        </div>
                        <p className="text-lg font-bold text-orange-500">٧</p>
                     </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-[#C8A96A]/10 flex justify-between items-end">
                     <div>
                        <p className="text-[10px] text-[#F7F5F0]/30 uppercase tracking-widest">إجمالي الأصناف</p>
                        <p className="text-2xl font-bold text-[#F7F5F0]">٢,٤١٨</p>
                     </div>
                     <button className="p-3 rounded-full bg-[#C8A96A]/10 text-[#C8A96A]"><Plus className="w-5 h-5" /></button>
                  </div>
               </div>

               {/* Shipping Map Visualization */}
               <div className="p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 flex flex-col">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">حركة الشحن</h3>
                  <div className="flex-1 relative flex flex-col items-center justify-center">
                      <div className="absolute inset-0 bg-pattern-islamic opacity-5 -z-10" />
                      <div className="w-full space-y-12 px-8">
                         <div className="relative flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,0.8)]" />
                            <div className="flex-1">
                               <p className="text-xs font-bold text-[#F7F5F0]">المدينة المنورة</p>
                               <p className="text-[9px] text-green-500">جاري التوصيل</p>
                            </div>
                            <div className="absolute right-[5px] top-3 w-px h-12 bg-gradient-to-b from-[#C8A96A] to-transparent" />
                         </div>
                         <div className="relative flex items-center gap-4 opacity-40">
                            <div className="w-3 h-3 rounded-full bg-[#C8A96A]" />
                            <div className="flex-1">
                               <p className="text-xs font-bold text-[#F7F5F0]">جدة</p>
                               <p className="text-[9px]">في الطريق</p>
                            </div>
                            <div className="absolute right-[5px] top-3 w-px h-12 bg-[#C8A96A]/20" />
                         </div>
                         <div className="relative flex items-center gap-4 opacity-40">
                            <div className="w-3 h-3 rounded-full bg-[#C8A96A]" />
                            <div className="flex-1">
                               <p className="text-xs font-bold text-[#F7F5F0]">الرياض</p>
                               <p className="text-[9px]">تم التسليم</p>
                            </div>
                         </div>
                      </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                     <button className="text-[10px] font-bold text-[#C8A96A] uppercase tracking-[0.3em]">عرض الخريطة الحية</button>
                  </div>
               </div>

               {/* Suppliers at Work */}
               <div className="p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 flex flex-col">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">موردين في العمل</h3>
                  <div className="space-y-4 flex-1">
                     {[
                        { name: 'مصنع الحرف النبوية', status: 'جاهز للتسليم', icon: Factory, color: '#A9D3B8' },
                        { name: 'معمل عبق المدينة', status: 'قيد التجهيز', icon: Factory, color: '#C8A96A' },
                        { name: 'ورشة الإتقان', status: 'تم التسليم', icon: Factory, color: '#F7F5F0' },
                     ].map((sup, i) => (
                        <div key={i} className="p-4 rounded-2xl border border-[#C8A96A]/5 bg-[#0D0D0D]/60 flex items-center gap-4 group hover:border-[#C8A96A]/20 transition-all cursor-pointer">
                           <div className="w-10 h-10 rounded-xl bg-[#151515] border border-[#C8A96A]/10 flex items-center justify-center" style={{ color: sup.color }}>
                              <sup.icon className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                              <p className="text-xs font-bold text-[#F7F5F0]">{sup.name}</p>
                              <p className="text-[9px] text-[#F7F5F0]/40 mt-0.5">{sup.status}</p>
                           </div>
                           <CheckCircle2 className="w-4 h-4 text-[#C8A96A]/20 group-hover:text-[#C8A96A] transition-colors" />
                        </div>
                     ))}
                  </div>
                  <button className="mt-8 py-3 text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest">إدارة الموردين</button>
               </div>
            </div>

            {/* Action Decisions (Footer Buttons) */}
            <div className="grid grid-cols-4 gap-6 pt-10 border-t border-[#C8A96A]/10">
               {[
                  { label: 'زيادة إنتاج شموع المدينة', meta: 'الطلب مرتفع', icon: Plus },
                  { label: 'تفعيل مورد بديل: بخور المدينة', meta: 'تأخير في التوريد', icon: AlertTriangle },
                  { label: 'إعادة توزيع الشحنات: المدينة - جدة', meta: 'تخفيف الضغط', icon: Truck },
                  { label: 'تسريع الطلبات قيد التجهيز', meta: 'أولوية عالية', icon: Clock },
               ].map((btn, i) => (
                  <button key={i} className="group p-6 rounded-3xl border border-[#C8A96A]/10 bg-[#151515]/20 hover:bg-[#C8A96A]/5 hover:border-[#C8A96A]/30 transition-all text-right">
                     <div className="w-10 h-10 rounded-xl border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] mb-4 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all">
                        <btn.icon className="w-5 h-5" />
                     </div>
                     <p className="text-xs font-bold text-[#F7F5F0] mb-1">{btn.label}</p>
                     <p className="text-[9px] text-[#C8A96A] uppercase font-sans tracking-widest">{btn.meta}</p>
                  </button>
               ))}
            </div>
         </div>
      </main>

      {/* 04. RIGHT SIDEBAR (Notifications & Urgent Alerts) */}
      <aside className="w-80 border-r border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col z-40">
         <div className="p-8 border-b border-[#C8A96A]/10 flex flex-col gap-6 bg-gradient-to-b from-red-500/5 to-transparent">
            <div className="flex items-center justify-between">
               <h3 className="text-xs font-bold tracking-widest uppercase text-red-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> تنبيهات عاجلة
               </h3>
               <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <p className="text-[11px] font-bold text-red-500 mb-1">نقص في مخزون العطر</p>
                  <p className="text-[10px] text-[#F7F5F0]/60">منتج شموع المدينة: الكمية الحالية &lt; 50</p>
               </div>
               <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <p className="text-[11px] font-bold text-orange-500 mb-1">تأخير في شحنة</p>
                  <p className="text-[10px] text-[#F7F5F0]/60">طلب #١٢٥٨ - جدة - تأخير يوم واحد</p>
               </div>
            </div>
            
            <button className="w-full py-2.5 rounded-xl border border-[#C8A96A]/10 text-[9px] font-bold text-[#C8A96A] uppercase tracking-widest hover:bg-[#C8A96A]/5 transition-all">عرض جميع التنبيهات</button>
         </div>

         <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <div>
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#F7F5F0]/40">النشاط المباشر</h3>
                  <LiveBadge isConnected />
               </div>
               <div className="space-y-6">
                  {[
                     { msg: 'تم استلام طلب جديد #١٢٦٠', time: 'منذ ٢ دقيقة', icon: ShoppingBag, color: '#C8A96A' },
                     { msg: 'تم شحن الطلب #١٢٥٥', time: 'منذ ٨ دقائق', icon: Truck, color: '#3b82f6' },
                     { msg: 'تم تحديث حالة طلب #١٢٤٨', time: 'منذ ١٢ دقيقة', icon: CheckCircle2, color: '#A9D3B8' },
                     { msg: 'تم استلام منتجات من مصنع الحرف النبوية', time: 'منذ ١٥ دقيقة', icon: Factory, color: '#C8A96A' },
                  ].map((act, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="mt-1">
                           <act.icon className="w-3.5 h-3.5" style={{ color: act.color }} />
                        </div>
                        <div>
                           <p className="text-[11px] text-[#F7F5F0]/80 leading-relaxed">{act.msg}</p>
                           <span className="text-[9px] text-[#F7F5F0]/20 font-sans">{act.time}</span>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-3 rounded-xl border border-[#C8A96A]/10 text-[9px] font-bold text-[#C8A96A] uppercase tracking-widest">عرض كل النشاط</button>
            </div>
         </div>
      </aside>

      {/* Overlays */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40">
            <Search className="w-5 h-5" />
         </div>
         <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#C8A96A] rounded-full" />
         </div>
      </div>
    </div>
  );
}

function LayoutDashboard(props: any) { return <BarChart3 {...props} /> }
function BoxIcon(props: any) { return <Package {...props} /> }
function DollarSign(props: any) { return <BarChart3 {...props} /> }
function LiveBadge({ isConnected }: { isConnected: boolean }) {
  return (
    <div className={cn(
      "px-2 py-0.5 rounded-full flex items-center gap-1.5 text-[9px] font-bold",
      isConnected ? "bg-[#244F3A]/30 text-[#A9D3B8]" : "bg-red-500/10 text-red-500"
    )}>
      LIVE <span className={cn("w-1 h-1 rounded-full", isConnected ? "bg-[#A9D3B8] animate-ping" : "bg-red-500")} />
    </div>
  )
}
