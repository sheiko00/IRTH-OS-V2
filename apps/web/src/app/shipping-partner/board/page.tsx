'use client';

import { useState } from 'react';
import { 
  Truck, Package, MapPin, AlertTriangle, 
  CheckCircle2, Clock, ShieldCheck, CreditCard, 
  LayoutDashboard, Settings, LogOut, ChevronLeft, 
  Search, Bell, Download, Plus, Eye, BarChart3,
  Calendar, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function ShippingPartnerBoardPage() {
  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. NAVIGATION SIDEBAR */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col p-6 z-50">
        <div className="mb-12 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] bg-[#0D0D0D]">
              <Truck className="w-5 h-5" />
           </div>
           <div>
              <h2 className="text-sm font-bold tracking-wider text-[#F7F5F0]">بوابة الشحن</h2>
              <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest mt-0.5">شريك الإمداد اللوجستي</p>
           </div>
        </div>

        <div className="space-y-4 flex-1">
           <CodexSidebarItem icon={LayoutDashboard} label="الرئيسية" isActive />
           <CodexSidebarItem icon={Package} label="الشحنات النشطة" />
           <CodexSidebarItem icon={MapPin} label="تتبع المسارات" />
           <CodexSidebarItem icon={AlertTriangle} label="الاستثناءات" />
           <CodexSidebarItem icon={CheckCircle2} label="تم التسليم" />
           <CodexSidebarItem icon={Calendar} label="الجدول الزمني" />
           <CodexSidebarItem icon={CreditCard} label="التسويات" />
           <CodexSidebarItem icon={Settings} label="الإعدادات" />
        </div>

        <div className="mt-auto">
           <div className="p-5 rounded-2xl bg-[#C8A96A]/5 border border-[#C8A96A]/15">
              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">دقة في الوقت، فخامة في الوصول</p>
              <div className="flex items-center gap-2 mt-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] text-green-500 font-bold">النظام متصل</span>
              </div>
           </div>
        </div>
      </aside>

      {/* 02. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] border border-[#C8A96A]/10 rounded-t-full -z-10 opacity-10 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header Section */}
            <div className="flex items-end justify-between border-b border-[#C8A96A]/10 pb-10">
               <div>
                  <h1 className="text-5xl font-bold text-[#F7F5F0]">لوحة الشحن</h1>
                  <p className="text-[#F7F5F0]/40 mt-4 max-w-lg leading-relaxed">
                     إدارة أسطول الشحن وتتبع الطرود الفاخرة لعملاء إرث حول العالم.
                  </p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="text-left">
                     <p className="text-sm font-bold text-[#F7F5F0]">أرامكس - Aramex</p>
                     <p className="text-[10px] text-[#C8A96A] uppercase tracking-widest">الشريك اللوجستي المعتمد</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#151515] border border-[#C8A96A]/10 flex items-center justify-center text-[#C8A96A]">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
               </div>
            </div>

            {/* Logistics Pulse (Metrics) */}
            <div className="grid grid-cols-4 gap-4 p-8 rounded-[3rem] border border-[#C8A96A]/15 bg-[#151515]/30 backdrop-blur-xl">
               <CodexMetricSeal label="قيد التوصيل" value="١٤٢" icon={Truck} />
               <CodexMetricSeal label="جاهز للاستلام" value="٢٨" icon={Package} />
               <CodexMetricSeal label="استثناءات" value="٣" icon={AlertTriangle} trendType="down" />
               <CodexMetricSeal label="نجاح التسليم" value="٩٨.٤٪" icon={CheckCircle2} />
            </div>

            {/* Active Shipments Pipeline */}
            <CodexArch title="مسار الشحنات النشطة" subtitle="التحكم اللحظي بحركة الطرود">
               <div className="flex gap-4 p-10 overflow-x-auto no-scrollbar">
                  <CodexPathStep count={1} label="تم الاستلام" isCompleted items={[{ title: '١٥ طرد', status: 'مستودع المدينة' }]} />
                  <CodexPathStep count={2} label="في الفرز" isCompleted items={[{ title: '١٠ طرود', status: 'مركز جدة' }]} />
                  <CodexPathStep count={3} label="في الطريق" isActive items={[{ title: 'شحنة #SHP-1022', status: 'إلى الرياض' }]} />
                  <CodexPathStep count={4} label="وصلت الوجهة" items={[{ title: '٥ طرود', status: 'الدمام' }]} />
                  <CodexPathStep count={5} label="قيد التسليم" items={[{ title: '٢ طرد', status: 'مكة المكرمة' }]} />
                  <CodexPathStep count={6} label="تم بنجاح" items={[{ title: '١١٢ طرد', status: 'اليوم' }]} />
               </div>
            </CodexArch>

            {/* Tracking Map & Exceptions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Visual Tracking Path */}
               <div className="lg:col-span-2">
                  <CodexArch title="خريطة التوزيع" subtitle="كثافة الشحنات حسب المناطق">
                     <div className="p-10 h-[400px] relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none" />
                        <div className="w-full h-full border border-[#C8A96A]/10 rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#C8A96A]/5 rounded-full" />
                           
                           <div className="flex justify-between relative z-10">
                              <div className="flex flex-col items-center">
                                 <div className="w-4 h-4 rounded-full bg-[#C8A96A] shadow-[0_0_15px_rgba(200,169,106,0.8)]" />
                                 <p className="text-[10px] font-bold text-[#F7F5F0] mt-2">المدينة</p>
                                 <p className="text-[8px] text-[#C8A96A]">المصدر</p>
                              </div>
                              <div className="flex flex-col items-center">
                                 <div className="w-4 h-4 rounded-full border border-[#C8A96A]/40" />
                                 <p className="text-[10px] font-bold text-[#F7F5F0] mt-2">الرياض</p>
                                 <p className="text-[8px] text-[#F7F5F0]/30">٤٢ شحنة</p>
                              </div>
                           </div>
                           
                           <div className="flex justify-around relative z-10">
                              <div className="flex flex-col items-center">
                                 <div className="w-4 h-4 rounded-full border border-[#C8A96A]/40" />
                                 <p className="text-[10px] font-bold text-[#F7F5F0] mt-2">جدة</p>
                                 <p className="text-[8px] text-[#F7F5F0]/30">٢٨ شحنة</p>
                              </div>
                              <div className="flex flex-col items-center">
                                 <div className="w-4 h-4 rounded-full border border-[#C8A96A]/40" />
                                 <p className="text-[10px] font-bold text-[#F7F5F0] mt-2">مكة</p>
                                 <p className="text-[8px] text-[#F7F5F0]/30">١٩ شحنة</p>
                              </div>
                           </div>
                           
                           {/* SVG Connector Lines */}
                           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                              <path d="M100,100 L400,100" stroke="#C8A96A" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                              <path d="M100,100 L250,300" stroke="#C8A96A" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                           </svg>
                        </div>
                     </div>
                  </CodexArch>
               </div>

               {/* Exceptions & Alerts */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">استثناءات تحتاج تدخل</h3>
                  <div className="space-y-4">
                     {[
                        { id: 'SHP-1260', reason: 'عنوان غير واضح', location: 'الرياض', urgency: 'high' },
                        { id: 'SHP-1255', reason: 'العميل لا يرد', location: 'جدة', urgency: 'medium' },
                        { id: 'SHP-1240', reason: 'عطل في وسيلة النقل', location: 'الدمام', urgency: 'high' },
                     ].map((exc, i) => (
                        <div key={i} className={cn(
                           "p-5 rounded-2xl border bg-[#151515]/20 flex gap-4 transition-all hover:scale-[1.02] cursor-pointer",
                           exc.urgency === 'high' ? "border-red-500/30" : "border-[#C8A96A]/10"
                        )}>
                           <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              exc.urgency === 'high' ? "bg-red-500/10 text-red-500" : "bg-[#C8A96A]/10 text-[#C8A96A]"
                           )}>
                              <AlertTriangle className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between">
                                 <p className="text-[9px] font-bold text-[#F7F5F0]/30 uppercase tracking-widest">{exc.id}</p>
                                 <span className="text-[8px] text-[#F7F5F0]/20 font-sans">{exc.location}</span>
                              </div>
                              <h4 className="text-xs font-bold text-[#F7F5F0] mt-1">{exc.reason}</h4>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-4 rounded-2xl border border-[#C8A96A]/10 text-[9px] font-bold text-[#C8A96A] uppercase tracking-[0.3em]">عرض كل الحالات</button>
               </div>
            </div>

            {/* Settlement & Payout Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               <div className="lg:col-span-1">
                  <CodexArch title="الملخص المالي" subtitle="التسويات الأسبوعية">
                     <div className="p-8 space-y-6">
                        <div className="flex justify-between items-center">
                           <p className="text-[10px] text-[#F7F5F0]/40 uppercase tracking-widest">مستحق حالي</p>
                           <p className="text-xl font-bold text-[#C8A96A]">١٨,٤٠٠ ر.س</p>
                        </div>
                        <div className="h-1 w-full bg-[#151515] rounded-full overflow-hidden">
                           <div className="h-full bg-[#C8A96A] rounded-full" style={{ width: '٧٠٪' }} />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#F7F5F0]/20">
                           <span>تاريخ التسوية القادم</span>
                           <span className="font-sans">2024/06/30</span>
                        </div>
                     </div>
                  </CodexArch>
               </div>
               
               <div className="lg:col-span-2 p-10 rounded-[3rem] border border-[#C8A96A]/10 bg-[#151515]/20 flex items-center justify-around">
                  <div className="text-center group cursor-pointer">
                     <div className="w-16 h-16 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D] flex items-center justify-center text-[#C8A96A] mb-4 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all">
                        <Download className="w-7 h-7" />
                     </div>
                     <p className="text-[10px] font-bold text-[#F7F5F0] uppercase tracking-widest">تحميل التقارير</p>
                  </div>
                  <div className="text-center group cursor-pointer">
                     <div className="w-16 h-16 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D] flex items-center justify-center text-[#C8A96A] mb-4 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all">
                        <Plus className="w-7 h-7" />
                     </div>
                     <p className="text-[10px] font-bold text-[#F7F5F0] uppercase tracking-widest">إضافة مندوب</p>
                  </div>
                  <div className="text-center group cursor-pointer">
                     <div className="w-16 h-16 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D] flex items-center justify-center text-[#C8A96A] mb-4 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all">
                        <Users className="w-7 h-7" />
                     </div>
                     <p className="text-[10px] font-bold text-[#F7F5F0] uppercase tracking-widest">إدارة المناطق</p>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* Global Overlays */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40">
            <Bell className="w-5 h-5" />
         </div>
      </div>
    </div>
  );
}
