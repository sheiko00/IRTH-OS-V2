'use client';

import { useState } from 'react';
import { 
  Crown, LayoutDashboard, Megaphone, ShoppingBag, 
  Truck, DollarSign, BarChart3, Settings, Bell, 
  Search, MessageSquare, Play, Share2, 
  AlertTriangle, CheckCircle2, Clock, Factory,
  Layers, MapPin, Globe, Filter, Plus, Eye, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function FounderDashboardPage() {
  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. NAVIGATION SIDEBAR (Role Switcher) */}
      <aside className="w-20 flex flex-col items-center py-8 border-l border-[#C8A96A]/10 bg-[#0A0A0A] z-50">
        <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] mb-12 shadow-[0_0_20px_rgba(200,169,106,0.15)]">
          <Crown className="w-6 h-6" />
        </div>
        <nav className="flex-1 flex flex-col gap-8">
           <button className="p-3 text-[#C8A96A] bg-[#C8A96A]/10 rounded-xl" title="المؤسس"><Crown className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors" title="المدير العام"><Users className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors" title="فريق التسويق"><Megaphone className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors" title="فريق العمليات"><Truck className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors" title="فريق المالية"><DollarSign className="w-6 h-6" /></button>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#B6975A] border border-[#C8A96A]/40 flex items-center justify-center text-[#0D0D0D] font-bold text-xs shadow-lg">م</div>
        </div>
      </aside>

      {/* 02. MODULE SIDEBAR (Founder Sub-nav) */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0D0D0D] flex flex-col p-6 z-40">
        <div className="mb-10">
           <h2 className="text-xl font-bold tracking-tight text-[#F7F5F0]">مركز القيادة</h2>
           <p className="text-[9px] text-[#C8A96A] uppercase tracking-[0.3em] mt-1">بإرث النبوة نسعى للعالمية</p>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
           <CodexSidebarItem icon={LayoutDashboard} label="لوحة القيادة" isActive />
           <CodexSidebarItem icon={ShoppingBag} label="الطلبات" />
           <CodexSidebarItem icon={BoxIcon} label="مخزون الإرث" />
           <CodexSidebarItem icon={Megaphone} label="التسويق" />
           <CodexSidebarItem icon={Truck} label="التوزيع العالمي" />
           <CodexSidebarItem icon={DollarSign} label="المالية" />
           <CodexSidebarItem icon={MessageSquare} label="مركز التواصل" />
           <CodexSidebarItem icon={BarChart3} label="تقارير النمو" />
           <CodexSidebarItem icon={Settings} label="الإعدادات" />
        </div>

        <div className="mt-10 p-6 rounded-[2rem] border border-[#C8A96A]/20 bg-gradient-to-br from-[#151515] to-[#0D0D0D] shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none" />
           <div className="relative z-10 text-center">
              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-[0.4em] mb-3">المدينة المنورة</p>
              <div className="flex items-center justify-center gap-3 mb-6">
                 <p className="text-3xl font-bold text-[#F7F5F0]">٢٤°</p>
                 <div className="w-px h-6 bg-[#C8A96A]/20" />
                 <p className="text-xs font-bold text-[#F7F5F0]/60">صافٍ</p>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#F7F5F0]/40">
                    <span className="text-[#C8A96A]">الفجر</span>
                    <span className="font-sans">٠٤:١٣</span>
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#F7F5F0]/40">
                    <span>الظهر</span>
                    <span className="font-sans">١٢:٣١</span>
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#F7F5F0]/40">
                    <span>العصر</span>
                    <span className="font-sans">٠٤:٠٥</span>
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#F7F5F0]/40">
                    <span>العشاء</span>
                    <span className="font-sans">٠٨:٤٥</span>
                 </div>
              </div>
           </div>
        </div>
      </aside>

      {/* 03. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[800px] border border-[#C8A96A]/5 rounded-t-full -z-10 opacity-10 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header: Arched Visual Header */}
            <header className="relative h-80 rounded-[3.5rem] border border-[#C8A96A]/25 overflow-hidden flex items-center px-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <img 
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop" 
                  alt="Madinah Heritage" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
               <div className="absolute inset-y-0 right-0 w-1/2 bg-pattern-islamic opacity-10 mix-blend-overlay" />
               
               <div className="relative z-10 w-full flex justify-between items-center">
                  <div className="max-w-3xl">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full border border-[#C8A96A]/40 flex items-center justify-center bg-[#C8A96A]/10 text-[#C8A96A] shadow-[0_0_30px_rgba(200,169,106,0.2)]">
                           <Crown className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-[#C8A96A] uppercase tracking-[0.5em]">Khatam Al-Heritage</p>
                     </div>
                     <h1 className="text-7xl font-bold text-[#F7F5F0] tracking-tighter mb-6 leading-tight">مركز قيادة إرث النبوة</h1>
                     <p className="text-lg text-[#F7F5F0]/60 max-w-xl leading-relaxed mb-8">
                        نظام تشغيل العلامة التجارية الأكثر فخامة وتأثيراً. ندير هنا كل تفاصيل "إرث" لنقل جودة المدينة المنورة لكل بقاع الأرض.
                     </p>
                     <div className="flex items-center gap-10">
                        <div className="flex flex-col">
                           <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-[0.3em] mb-1">إيرادات الإرث</p>
                           <p className="text-4xl font-bold font-sans tracking-tight">١.٢٨ مليون</p>
                        </div>
                        <div className="w-px h-12 bg-[#C8A96A]/20" />
                        <div className="flex flex-col">
                           <p className="text-[10px] text-[#A9D3B8] font-bold uppercase tracking-[0.3em] mb-1">النمو الاستراتيجي</p>
                           <p className="text-4xl font-bold font-sans text-[#A9D3B8]">+٢٤٪</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-[#0D0D0D]/60 backdrop-blur-md p-6 rounded-[2rem] border border-[#C8A96A]/20">
                     <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] animate-pulse">
                        <Globe className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest">البث المباشر</p>
                        <p className="text-xs font-bold text-[#F7F5F0]">النظام يعمل بكفاءة تامة</p>
                     </div>
                  </div>
               </div>
            </header>

            {/* Operational Flow (Kanban/Timeline Hybrid) */}
            <CodexArch title="التدفق التشغيلي" subtitle="نظرة عامة على دورة حياة القيمة">
               <div className="flex gap-4 p-8 overflow-x-auto no-scrollbar">
                  <CodexPathStep count={1} label="تسويق" items={[{ title: '٤ حملات نشطة' }]} />
                  <CodexPathStep count={2} label="طلبات جديدة" isActive items={[{ title: '٢٣ طلب بانتظار المعالجة' }]} />
                  <CodexPathStep count={3} label="تجهيز" items={[{ title: '١٨ طلب في المختبر' }]} />
                  <CodexPathStep count={4} label="شحن" items={[{ title: '١٢ شحنة في الطريق' }]} />
                  <CodexPathStep count={5} label="تم التسليم" isCompleted items={[{ title: '٩٨ طلب اليوم' }]} />
               </div>
            </CodexArch>

            {/* Marketing & Strategic Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Marketing Campaigns Arched List */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-bold text-[#F7F5F0] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C8A96A]" /> حملات التسويق
                     </h3>
                     <button className="text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest opacity-60">عرض الكل</button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     {[
                        { title: 'حملة المدينة المنورة', date: 'من ١٠ مايو - ٢٠ يونيو', progress: 72, img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=500&auto=format&fit=crop' },
                        { title: 'رمضان في المدينة', date: 'من ١ أبريل - ٣٠ أبريل', progress: 100, img: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=500&auto=format&fit=crop' },
                        { title: 'إرث النبوة', date: 'من ٢٥ مارس - ١٥ أبريل', progress: 100, img: 'https://images.unsplash.com/photo-1590076214667-548c3b7b2825?q=80&w=500&auto=format&fit=crop' },
                        { title: 'إرث الحرمين', date: 'من ٥ يونيو - ٢٥ يونيو', progress: 43, img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=500&auto=format&fit=crop' },
                     ].map((camp, i) => (
                        <div key={i} className="group relative h-48 rounded-[2.5rem] border border-[#C8A96A]/15 overflow-hidden transition-all hover:scale-[1.02]">
                           <img src={camp.img} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" alt={camp.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
                           <div className="absolute bottom-6 inset-x-6">
                              <h4 className="text-sm font-bold text-[#F7F5F0] mb-1">{camp.title}</h4>
                              <p className="text-[9px] text-[#F7F5F0]/40 uppercase tracking-widest font-sans mb-4">{camp.date}</p>
                              <div className="h-1 w-full bg-[#F7F5F0]/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#C8A96A] rounded-full" style={{ width: `${camp.progress}%` }} />
                              </div>
                              <div className="flex justify-between mt-2">
                                 <span className="text-[8px] font-bold text-[#C8A96A] uppercase">{camp.progress === 100 ? 'مكتملة' : 'نشطة'}</span>
                                 <span className="text-[8px] font-bold text-[#F7F5F0]/30">{camp.progress}%</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Strategic Alerts & System Health */}
               <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#F7F5F0] flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> التنبيهات الاستراتيجية
                  </h3>
                  <div className="space-y-4">
                     {[
                        { title: 'مخزون منخفض', msg: '٣ منتجات تحتاج إعادة طلب مبكراً', icon: AlertTriangle, color: 'red' },
                        { title: 'حملة قريبة الانتهاء', msg: 'حملة المدينة المنورة متبقي يومان', icon: Clock, color: 'orange' },
                        { title: 'تأخير في الشحن', msg: '٨ طلبات تحتاج متابعة مباشرة', icon: Truck, color: 'red' },
                     ].map((alert, i) => (
                        <div key={i} className={cn(
                           "p-6 rounded-[2rem] border bg-[#151515]/30 relative overflow-hidden group hover:scale-[1.02] transition-all",
                           alert.color === 'red' ? "border-red-500/20" : "border-orange-500/20"
                        )}>
                           <div className="flex gap-4 items-start">
                              <div className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center",
                                 alert.color === 'red' ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500"
                              )}>
                                 <alert.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-sm font-bold text-[#F7F5F0]">{alert.title}</h4>
                                 <p className="text-[10px] text-[#F7F5F0]/40 mt-1 leading-relaxed">{alert.msg}</p>
                              </div>
                              <Plus className="w-4 h-4 text-[#C8A96A]/20 rotate-45 group-hover:text-[#C8A96A] transition-colors" />
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-4 rounded-2xl border border-[#C8A96A]/10 text-[9px] font-bold text-[#C8A96A] uppercase tracking-[0.3em] hover:bg-[#C8A96A]/5 transition-all">عرض كل التنبيهات</button>
               </div>
            </div>

            {/* Bottom Row: Order Stream & Founder's Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Order Status Timeline */}
               <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-6 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[#C8A96A]" /> سير الطلبات
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                     {[
                        { label: 'جديدة', count: 23, active: true },
                        { label: 'قيد المراجعة', count: 14, active: false },
                        { label: 'قيد التجهيز', count: 18, active: false },
                        { label: 'في الطريق', count: 12, active: false },
                        { label: 'تم التسليم', count: 98, active: false },
                     ].map((step, i) => (
                        <div key={i} className={cn(
                           "p-6 rounded-[2.5rem] border flex flex-col items-center text-center transition-all",
                           step.active ? "bg-[#C8A96A]/10 border-[#C8A96A] shadow-[inset_0_0_20px_rgba(200,169,106,0.1)]" : "bg-[#151515]/30 border-[#C8A96A]/10"
                        )}>
                           <p className="text-2xl font-bold font-sans mb-1">{step.count}</p>
                           <p className={cn("text-[9px] font-bold uppercase tracking-widest", step.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/30")}>{step.label}</p>
                           {step.active && <div className="mt-4 w-1.5 h-1.5 rounded-full bg-[#C8A96A] animate-pulse" />}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Founder's Strategic Quote */}
               <div className="flex flex-col justify-end">
                  <div className="p-8 rounded-[3rem] border border-[#C8A96A]/15 bg-gradient-to-br from-[#151515] to-[#0D0D0D] relative overflow-hidden text-center group">
                     <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none" />
                     <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] mx-auto mb-6 opacity-40">
                        <Plus className="w-6 h-6 rotate-45" />
                     </div>
                     <p className="text-lg font-bold text-[#F7F5F0] italic leading-relaxed mb-6">"ركز على جودة التجربة... فالإرث لا يُباع، بل يُعاش."</p>
                     <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-[0.4em]">قرار المؤسس اليوم</p>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* 04. ACTIVITY SIDEBAR (Live Action Feed) */}
      <aside className="w-80 border-r border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col z-40">
         <div className="p-8 border-b border-[#C8A96A]/10">
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#F7F5F0] mb-2">البث النشط المباشر</h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
               <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Live Activity Stream</p>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
            {[
               { type: 'order.created', msg: 'تم إنشاء طلب جديد #١٢٥٨', time: 'منذ ٢ ثانية', color: '#C8A96A' },
               { type: 'order.updated', msg: 'تم تحديث الطلب #١٢٥٥', time: 'منذ ٨ ثواني', color: '#3b82f6' },
               { type: 'stock.low', msg: 'مخزون منخفض: مسك المدينة', time: 'منذ ١١ ثانية', color: '#ef4444' },
               { type: 'campaign.updated', msg: 'تم تحديث الحملة: روح المدينة', time: 'منذ ١٨ ثانية', color: '#A9D3B8' },
               { type: 'shipment.updated', msg: 'تم تحديث الشحنة #SHP-1022', time: 'منذ ٢٢ ثانية', color: '#C8A96A' },
               { type: 'message.created', msg: 'تم استلام رسالة جديدة من مورد', time: 'منذ ٢٧ ثانية', color: '#7FA88B' },
               { type: 'notification.created', msg: 'تم إرسال إشعار للموزعين', time: 'منذ ٣٣ ثانية', color: '#C8A96A' },
            ].map((ev, i) => (
               <div key={i} className="flex gap-4 group">
                  <div className="mt-1.5 flex flex-col items-center">
                     <div className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(200,169,106,0.3)] transition-all group-hover:scale-150" style={{ backgroundColor: ev.color }} />
                     {i < 6 && <div className="w-px h-12 bg-[#C8A96A]/10 mt-2" />}
                  </div>
                  <div>
                     <p className="text-[11px] text-[#F7F5F0] font-medium leading-relaxed group-hover:text-[#C8A96A] transition-colors">{ev.msg}</p>
                     <p className="text-[9px] text-[#F7F5F0]/20 font-sans mt-1">{ev.time}</p>
                     <p className="text-[8px] text-[#C8A96A] uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{ev.type}</p>
                  </div>
               </div>
            ))}
         </div>

         <div className="p-8 border-t border-[#C8A96A]/10 bg-gradient-to-t from-[#C8A96A]/5 to-transparent">
            <h4 className="text-[10px] font-bold text-[#F7F5F0]/40 uppercase tracking-widest mb-6">الإشعارات والقنوات</h4>
            <div className="grid grid-cols-2 gap-4">
               {[
                  { label: 'البريد الإلكتروني', icon: Mail, count: 3 },
                  { label: 'الرسائل النصية', icon: MessageSquare, count: 12 },
                  { label: 'واتساب', icon: Share2, count: 5 },
                  { label: 'إشعارات داخلية', icon: Bell, count: 28 },
               ].map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#C8A96A]/5 bg-[#0D0D0D] hover:border-[#C8A96A]/20 transition-all cursor-pointer group">
                     <ch.icon className="w-3.5 h-3.5 text-[#C8A96A]/40 group-hover:text-[#C8A96A]" />
                     <div className="flex-1">
                        <p className="text-[8px] font-bold text-[#F7F5F0]/60">{ch.label}</p>
                     </div>
                     <span className="text-[9px] font-bold font-sans text-[#C8A96A]">{ch.count}</span>
                  </div>
               ))}
            </div>
         </div>
      </aside>

      {/* Global Overlays */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <button className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40 hover:text-[#C8A96A] transition-all">
            <Search className="w-5 h-5" />
         </button>
         <button className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40 relative hover:text-[#C8A96A] transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#C8A96A] rounded-full shadow-[0_0_10px_rgba(200,169,106,0.8)]" />
         </button>
      </div>
    </div>
  );
}

function Users(props: any) { return <UsersIcon {...props} /> }
import { Users as UsersIcon, Mail } from 'lucide-react';
function BoxIcon(props: any) { return <Package {...props} /> }
