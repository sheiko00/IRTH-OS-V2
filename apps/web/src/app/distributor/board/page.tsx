'use client';

import { useState } from 'react';
import { 
  Users, ShoppingBag, DollarSign, BarChart3, 
  MapPin, Package, Clock, ShieldCheck,
  CreditCard, LayoutDashboard, Settings, LogOut,
  ChevronLeft, Search, Bell, Download, Plus, Eye,
  ArrowRight, Filter, TrendingUp, Globe, Truck, Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function DistributorBoardPage() {
  const [qty, setQty] = useState(120);

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. NAVIGATION SIDEBAR */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col p-6 z-50">
        <div className="mb-12 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] bg-[#0D0D0D]">
              <Globe className="w-5 h-5" />
           </div>
           <div>
              <h2 className="text-sm font-bold tracking-wider text-[#F7F5F0]">بوابة الموزع</h2>
              <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest mt-0.5">نصل منتج الإرث لأسواق العالم</p>
           </div>
        </div>

        <div className="space-y-4 flex-1">
           <CodexSidebarItem icon={LayoutDashboard} label="الرئيسية" isActive />
           <CodexSidebarItem icon={ShoppingBag} label="طلبات الجملة" />
           <CodexSidebarItem icon={DollarSign} label="التسعير" />
           <CodexSidebarItem icon={BarChart3} label="الطلبات" />
           <CodexSidebarItem icon={MapPin} label="المنطقة" />
           <CodexSidebarItem icon={Package} label="إعادة الطلب" />
           <CodexSidebarItem icon={CreditCard} label="المدفوعات" />
           <CodexSidebarItem icon={Settings} label="الإعدادات" />
        </div>

        <div className="mt-auto">
           <div className="p-5 rounded-2xl bg-gradient-to-br from-[#C8A96A]/10 to-transparent border border-[#C8A96A]/20">
              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">معاً ننشر نور الإرث</p>
              <div className="flex items-center gap-2 mt-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] text-green-500 font-bold">متصل الآن</span>
              </div>
           </div>
        </div>
      </aside>

      {/* 02. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] border border-[#C8A96A]/10 rounded-t-full -z-10 opacity-10 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Top Section: Order Builder & Tier Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Bulk Order Builder */}
               <div className="lg:col-span-2 space-y-6">
                  <CodexArch title="طلبات الجملة" subtitle="اختر المنتجات والكميات لبناء عرض سعر">
                     <div className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                           {[
                              { label: 'اختر المنتجات', active: true },
                              { label: 'حدد الكمية', active: true },
                              { label: 'اختر التسعير', active: false },
                              { label: 'مراجعة الطلب', active: false },
                           ].map((step, i) => (
                              <div key={i} className="flex flex-col items-center gap-3">
                                 <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-bold", step.active ? "bg-[#C8A96A] text-[#0D0D0D] border-[#C8A96A]" : "border-[#C8A96A]/30 text-[#C8A96A]/30")}>
                                    {4 - i}
                                 </div>
                                 <p className={cn("text-[9px] font-bold uppercase tracking-widest", step.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/20")}>{step.label}</p>
                              </div>
                           ))}
                        </div>

                        <div className="p-6 rounded-3xl border border-[#C8A96A]/10 bg-[#151515]/40 flex items-center gap-6 group hover:border-[#C8A96A]/30 transition-all">
                           <div className="w-24 h-24 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D] p-2">
                              <img src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Dates" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-lg font-bold text-[#F7F5F0]">تمر عجوة المدينة</h4>
                              <p className="text-xs text-[#C8A96A] mt-1 italic">مغلف - كرتون - ١٠ كغ</p>
                              <div className="flex items-center gap-4 mt-4">
                                 <button onClick={() => setQty(Math.max(0, qty - 10))} className="w-8 h-8 rounded-lg bg-[#0D0D0D] border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A]">-</button>
                                 <p className="text-xl font-bold font-sans w-16 text-center">{qty}</p>
                                 <button onClick={() => setQty(qty + 10)} className="w-8 h-8 rounded-lg bg-[#0D0D0D] border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A]">+</button>
                                 <span className="text-xs text-[#F7F5F0]/40">الكمية: {qty} كرتون</span>
                              </div>
                           </div>
                           <ChevronLeft className="w-6 h-6 text-[#C8A96A]/20 group-hover:text-[#C8A96A] transition-all" />
                        </div>

                        <div className="flex gap-4">
                           <button className="flex-1 py-4 rounded-2xl border border-[#C8A96A]/10 text-xs font-bold text-[#C8A96A] uppercase tracking-widest hover:bg-[#C8A96A]/5 transition-all">
                              (+) إضافة منتج آخر
                           </button>
                           <button className="flex-[2] py-4 rounded-2xl bg-[#C8A96A] text-[#0D0D0D] text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                              إنشاء طلب عرض سعر
                           </button>
                        </div>
                     </div>
                  </CodexArch>
               </div>

               {/* Tier Pricing Seals */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">التسعير</h3>
                  <div className="space-y-4">
                     {[
                        { label: 'ذهبية', meta: 'الطلب من ٢٠١+', discount: '١٢٪', active: false },
                        { label: 'فضية', meta: 'الطلب من ٥١ - ٢٠٠', discount: '٧٪', active: true },
                        { label: 'أساسية', meta: 'الطلب من ١٠ - ٥٠', discount: '٣٪', active: false },
                     ].map((tier, i) => (
                        <div key={i} className={cn(
                           "p-6 rounded-[2.5rem] border transition-all relative overflow-hidden group cursor-pointer",
                           tier.active ? "bg-[#C8A96A] border-[#C8A96A] text-[#0D0D0D]" : "bg-[#151515]/40 border-[#C8A96A]/10 text-[#F7F5F0]"
                        )}>
                           {tier.active && <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none" />}
                           <div className="relative z-10 flex justify-between items-center">
                              <div>
                                 <h4 className="text-lg font-bold">{tier.label}</h4>
                                 <p className={cn("text-[9px] uppercase tracking-widest mt-1", tier.active ? "text-[#0D0D0D]/60" : "text-[#C8A96A]")}>{tier.meta}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-2xl font-bold font-sans">{tier.discount}</p>
                                 <p className={cn("text-[8px] uppercase tracking-widest", tier.active ? "text-[#0D0D0D]/60" : "text-[#F7F5F0]/30")}>خصم</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/40">
                     <p className="text-[10px] text-[#A9D3B8] font-bold uppercase tracking-widest mb-3">مزايا إضافية</p>
                     <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center text-center gap-1 opacity-60">
                           <Truck className="w-4 h-4 text-[#C8A96A]" />
                           <span className="text-[7px] font-bold">شحن مجاني للطلبات الكبيرة</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 opacity-60">
                           <Clock className="w-4 h-4 text-[#C8A96A]" />
                           <span className="text-[7px] font-bold">أولوية في التوفر</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 opacity-60">
                           <Megaphone className="w-4 h-4 text-[#C8A96A]" />
                           <span className="text-[7px] font-bold">دعم تسويقي مشترك</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Middle Section: Regional Demand & Order Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Order Pipeline */}
               <div className="lg:col-span-2">
                  <CodexArch title="الطلبات" subtitle="تتبع حالة شحناتك الحالية">
                     <div className="p-8 space-y-10">
                        <div className="flex gap-4 border-b border-[#C8A96A]/10 pb-4">
                           {['قيد المراجعة', 'قيد التجهيز', 'قيد الشحن', 'تم التسليم', 'الكل'].map((t, i) => (
                              <button key={i} className={cn(
                                 "text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full transition-all",
                                 i === 0 ? "bg-[#C8A96A] text-[#0D0D0D]" : "text-[#F7F5F0]/30 hover:text-[#C8A96A]"
                              )}>{t}</button>
                           ))}
                        </div>
                        <div className="space-y-6">
                           {[
                              { id: 'ORD-2024-3341', title: 'طلب عرض سعر', status: 'قيد المراجعة', date: 'منذ ٢ ساعة', active: true },
                              { id: 'ORD-2024-2210', title: 'مؤكد', status: 'قيد التجهيز', date: 'منذ ٥ ساعات', active: false },
                              { id: 'ORD-2024-2198', title: 'قيد الشحن', status: 'في الطريق', date: 'منذ ١ يوم', active: false },
                              { id: 'ORD-2024-2144', title: 'تم التسليم', status: 'مكتمل', date: 'منذ ٢ يوم', active: false },
                           ].map((ord, i) => (
                              <div key={i} className="flex items-center gap-6 group">
                                 <div className={cn("w-2 h-2 rounded-full", ord.active ? "bg-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,0.8)]" : "bg-[#C8A96A]/20")} />
                                 <div className="flex-1 p-5 rounded-2xl border border-[#C8A96A]/10 bg-[#151515]/30 group-hover:border-[#C8A96A]/30 transition-all flex items-center justify-between">
                                    <div>
                                       <p className="text-[9px] text-[#C8A96A] font-bold uppercase tracking-widest">{ord.id}</p>
                                       <h4 className="text-sm font-bold text-[#F7F5F0] mt-1">{ord.title}</h4>
                                    </div>
                                    <div className="text-center">
                                       <div className="w-10 h-10 rounded-full border border-[#C8A96A]/10 flex items-center justify-center text-[#C8A96A] mb-1">
                                          {i === 0 ? <Eye className="w-4 h-4" /> : i === 2 ? <Truck className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                       </div>
                                       <p className="text-[8px] font-bold text-[#F7F5F0]/40">{ord.status}</p>
                                    </div>
                                    <div className="text-left">
                                       <p className="text-[9px] text-[#F7F5F0]/20 font-sans">{ord.date}</p>
                                    </div>
                                 </div>
                                 {i < 3 && <ArrowRight className="w-4 h-4 text-[#C8A96A]/10 rotate-90" />}
                              </div>
                           ))}
                        </div>
                     </div>
                  </CodexArch>
               </div>

               {/* Regional Demand Map */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">المنطقة</h3>
                  <CodexArch className="h-[460px] flex flex-col">
                     <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
                        <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none" />
                        {/* Map Outline Placeholder */}
                        <div className="w-full h-full border border-[#C8A96A]/10 rounded-3xl relative flex items-center justify-center">
                           <Globe className="w-32 h-32 text-[#C8A96A]/5" />
                           <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#C8A96A] rounded-full shadow-2xl" />
                           <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#C8A96A] rounded-full shadow-2xl" />
                           <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#C8A96A] rounded-full shadow-2xl" />
                        </div>
                     </div>
                     <div className="p-8 space-y-4 bg-[#0A0A0A]/40 border-t border-[#C8A96A]/10">
                        <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-4">أداء المناطق</p>
                        {[
                           { label: 'السعودية', value: '٧٢٪' },
                           { label: 'الإمارات', value: '٤١٪' },
                           { label: 'مصر', value: '٤٨٪' },
                           { label: 'الأردن', value: '٣٩٪' },
                           { label: 'الكويت', value: '٣٣٪' },
                        ].map((reg, i) => (
                           <div key={i} className="flex items-center gap-4">
                              <p className="text-[10px] text-[#F7F5F0]/60 w-16">{reg.label}</p>
                              <div className="flex-1 h-1 bg-[#151515] rounded-full overflow-hidden">
                                 <div className="h-full bg-[#C8A96A] rounded-full" style={{ width: reg.value }} />
                              </div>
                              <p className="text-[10px] font-bold text-[#F7F5F0]">{reg.value}</p>
                           </div>
                        ))}
                        <button className="w-full mt-4 text-[9px] font-bold text-[#C8A96A] uppercase tracking-widest opacity-60">عرض كل المناطق</button>
                     </div>
                  </CodexArch>
               </div>
            </div>

            {/* Bottom Row: Product Spotlight & Account Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Product Spotlight */}
               <div className="lg:col-span-2">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mb-6 mr-2">منتجاتك الأكثر طلباً</h3>
                  <div className="grid grid-cols-3 gap-6">
                     {[
                        { title: 'تمر خلاص فاخر', date: 'آخر طلب: ١٥ يوم', icon: '🌴' },
                        { title: 'تمر سكري فاخر', date: 'آخر طلب: ٢٥ يوم', icon: '🌴' },
                        { title: 'معمول تمر فاخر', date: 'آخر طلب: ٢٥ يوم', icon: '🍪' },
                     ].map((prod, i) => (
                        <div key={i} className="group p-8 rounded-[3rem] border border-[#C8A96A]/10 bg-[#151515]/30 flex flex-col items-center text-center hover:border-[#C8A96A]/40 transition-all cursor-pointer">
                           <div className="w-20 h-20 rounded-full border border-[#C8A96A]/20 bg-[#0D0D0D] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(200,169,106,0.1)]">
                              {prod.icon}
                           </div>
                           <h4 className="text-sm font-bold text-[#F7F5F0] mb-1">{prod.title}</h4>
                           <p className="text-[9px] text-[#C8A96A] uppercase font-sans tracking-widest mb-6">{prod.date}</p>
                           <button className="w-full py-2 rounded-xl border border-[#C8A96A]/10 text-[9px] font-bold text-[#C8A96A] uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#0D0D0D] transition-all">إعادة طلب</button>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Account Status Card */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">حالة الحساب</h3>
                  <div className="p-8 rounded-[2.5rem] border border-[#C8A96A]/15 bg-gradient-to-br from-[#151515] to-[#0D0D0D] flex flex-col justify-between h-[300px]">
                     <div className="space-y-8">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">الحد الائتماني</p>
                              <p className="text-2xl font-bold text-[#F7F5F0]">١٢٠,٠٠٠ ر.س</p>
                           </div>
                           <div className="w-12 h-12 rounded-xl border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A]">
                              <CreditCard className="w-6 h-6" />
                           </div>
                        </div>
                        <div>
                           <div className="flex justify-between items-center mb-2">
                              <p className="text-[10px] text-[#F7F5F0]/40 font-bold uppercase tracking-widest">المتاح</p>
                              <p className="text-sm font-bold text-[#F7F5F0]">٤٨,٥٠٠ ر.س</p>
                           </div>
                           <div className="h-1.5 w-full bg-[#0D0D0D] rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '40%' }} />
                           </div>
                        </div>
                     </div>
                     <div className="pt-8 border-t border-[#C8A96A]/10">
                        <div className="flex justify-between items-center mb-1">
                           <p className="text-[10px] text-[#F7F5F0]/40 uppercase tracking-widest">المستحق الحالي</p>
                           <p className="text-lg font-bold text-[#C8A96A]">٧١,٥٠٠ ر.س</p>
                        </div>
                        <p className="text-[9px] text-[#F7F5F0]/20 font-sans">موعد السداد: 2024/06/30</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* Global Overlays */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-[#151515] border border-[#C8A96A]/15 shadow-2xl">
            <div className="text-left">
               <p className="text-[10px] text-[#F7F5F0]/30 uppercase tracking-widest font-bold">تقييمك</p>
               <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className={cn("w-2 h-2 rounded-full", i < 4 ? "bg-[#C8A96A]" : "bg-[#C8A96A]/20")} />
                  ))}
                  <span className="text-xs font-bold text-[#F7F5F0] ml-2">4.8 / 5</span>
               </div>
            </div>
            <div className="h-8 w-px bg-[#C8A96A]/10" />
            <p className="text-[10px] text-[#A9D3B8] font-bold uppercase tracking-widest">شريك موثوق</p>
         </div>
         <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40">
            <Bell className="w-5 h-5" />
         </div>
      </div>
    </div>
  );
}
