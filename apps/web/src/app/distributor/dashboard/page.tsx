'use client';

import { useEffect, useState } from 'react';
import { 
  ShoppingCart, Package, Truck, Store, 
  Activity, ArrowUpRight, Clock, Star, ChevronLeft, Megaphone,
  Map, Plus, CheckCircle2
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useSocket } from '@/hooks/use-socket';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'ORDER_UPDATE',
    title: 'طلب معتمد',
    message: 'تم اعتماد طلبك رقم IRTH-B2B-9988 من قبل الإدارة.',
    time: 'منذ ١٥ دقيقة',
    icon: ShoppingCart,
    color: '#10b981'
  },
  {
    id: '2',
    type: 'STOCK_ALERT',
    title: 'توفر مخزون جديد',
    message: 'تم توفير مخزون إضافي من "بخور مديني فاخر" في المستودع الرئيسي.',
    time: 'منذ ساعتين',
    icon: Package,
    color: '#C8A96A'
  }
];

export default function DistributorDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { socket, isConnected } = useSocket(token || undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('order.update', (order: any) => {
        const newNotif = {
          id: `dist-order-${order.id}`,
          type: 'ORDER_UPDATE',
          title: 'تحديث حالة طلبك',
          message: order.message,
          time: 'الآن',
          icon: ShoppingCart,
          color: '#C8A96A'
        };
        setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
      });
    }
    return () => {
      if (socket) socket.off('order.update');
    };
  }, [socket]);

  if (!mounted) return null;

  return (
    <div className="font-serif animate-fade-in rtl h-full flex -m-10" dir="rtl">
      
      {/* LEFT HALF: Main Distributor Hub */}
      <div className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-8">
        
        {/* Top Header */}
        <div className="flex items-end justify-between border-b border-[#C8A96A]/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 bg-[#151515] flex items-center justify-center shadow-[0_0_15px_rgba(200,169,106,0.15)]">
                <span className="text-xl text-[#C8A96A]">إ</span>
              </div>
              بوابة الموزع
            </h1>
            <p className="text-[#C8A96A] text-sm tracking-widest uppercase">نصل بمنتج الإرث لأسواق العالم</p>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border bg-[#151515]",
            isConnected ? "border-green-500/20" : "border-red-500/20"
          )}>
            <span className="relative flex h-2 w-2">
              {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={cn("relative inline-flex rounded-full h-2 w-2", isConnected ? "bg-green-500" : "bg-red-500")}></span>
            </span>
            <span className={cn("text-xs font-sans tracking-widest", isConnected ? "text-green-500" : "text-red-500")}>
              Live
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Column 1: Wholesale Orders, Pipeline, Map */}
          <div className="xl:col-span-6 space-y-8">
            
            {/* Wholesale Orders */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">طلبات الجملة</h3>
              
              {/* Stepper */}
              <div className="flex justify-between items-center relative px-2 mb-10">
                <div className="absolute top-3 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/50 to-transparent" />
                {[
                  { num: '4', label: 'مراجعة الطلب' },
                  { num: '3', label: 'حدد الكمية' },
                  { num: '2', label: 'اختر التسعير' },
                  { num: '1', label: 'اختر المنتجات', active: true },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 bg-[#151515] px-4">
                    <div className={cn(
                      "w-6 h-6 rounded-full border flex items-center justify-center mb-3 font-sans text-xs font-bold",
                      step.active ? "border-[#C8A96A] text-[#C8A96A] bg-[#C8A96A]/10" : "border-[#F7F5F0]/20 text-[#F7F5F0]/40 bg-[#0D0D0D]"
                    )}>
                      {step.num}
                    </div>
                    <p className={cn("text-[9px] font-bold tracking-widest", step.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/40")}>{step.label}</p>
                  </div>
                ))}
              </div>

              {/* Product Selector */}
              <div className="p-4 rounded-2xl border border-[#C8A96A]/20 bg-[#0D0D0D] flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C8A96A]/30">
                    <img src="https://images.unsplash.com/photo-1590076214667-548c3b7b2825?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Dates" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F7F5F0] mb-1">تمر عجوة المدينة</h4>
                    <p className="text-[10px] text-[#F7F5F0]/40">مغلف - 1 كغ - فاخر</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 bg-[#151515] border border-[#C8A96A]/20 rounded-full px-2 py-1">
                    <button className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#F7F5F0]/60 flex items-center justify-center hover:text-[#C8A96A]">-</button>
                    <span className="font-sans font-bold text-sm">120</span>
                    <button className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#F7F5F0]/60 flex items-center justify-center hover:text-[#C8A96A]">+</button>
                  </div>
                  <p className="text-[10px] text-[#C8A96A]">الكمية: 120 كرتون</p>
                </div>
              </div>

              <button className="w-full py-4 border border-dashed border-[#C8A96A]/30 rounded-2xl text-xs font-bold text-[#C8A96A] flex items-center justify-center gap-2 hover:bg-[#C8A96A]/5 transition-colors mb-6">
                <Plus className="w-4 h-4" /> إضافة منتج آخر
              </button>

              <button className="w-full py-4 rounded-xl bg-gradient-to-l from-[#C8A96A] to-[#B6975A] text-[#0D0D0D] font-bold shadow-[0_0_20px_rgba(200,169,106,0.3)] hover:opacity-90 transition-opacity">
                إنشاء طلب عرض سعر
              </button>
            </div>

            {/* Orders Pipeline */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-8 border-b border-[#C8A96A]/10 pb-4">
                <h3 className="text-lg font-bold text-[#F7F5F0]">الطلبات</h3>
                <div className="flex gap-4">
                  <button className="text-xs font-bold text-[#C8A96A] border-b-2 border-[#C8A96A] pb-2">قيد المعالجة</button>
                  <button className="text-xs text-[#F7F5F0]/40 pb-2">الكل</button>
                </div>
              </div>

              <div className="flex justify-between relative px-2">
                <div className="absolute top-4 left-10 right-10 h-[1px] bg-[#C8A96A]/20" />
                {[
                  { title: 'طلب عرض سعر', id: '#O-2024-3341', time: 'منذ ساعتين', active: false },
                  { title: 'مؤكد', id: '#O-2024-2210', time: 'منذ 5 ساعات', active: false },
                  { title: 'قيد الشحن', id: '#O-2024-2198', time: 'في الطريق', active: true },
                  { title: 'تم التسليم', id: '#O-2024-2144', time: 'مكتمل', active: false, done: true },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 w-24">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center mb-3 bg-[#0D0D0D]",
                      step.active ? "border-[#C8A96A] text-[#C8A96A]" : step.done ? "border-green-500 text-green-500" : "border-[#C8A96A]/30 text-[#F7F5F0]/30"
                    )}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : <div className={cn("w-2 h-2 rounded-full", step.active ? "bg-[#C8A96A]" : "bg-transparent")} />}
                    </div>
                    <p className="text-[10px] font-bold text-[#F7F5F0] mb-1">{step.title}</p>
                    <p className="text-[9px] text-[#F7F5F0]/50 font-sans tracking-widest">{step.id}</p>
                    <span className={cn("text-[8px] px-1.5 py-0.5 rounded mt-2", step.active ? "bg-[#C8A96A]/10 text-[#C8A96A]" : step.done ? "bg-green-500/10 text-green-500" : "bg-[#151515] text-[#F7F5F0]/40")}>{step.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Region Map Widget */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 flex gap-6 shadow-xl">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#F7F5F0] mb-6">المنطقة</h3>
                <div className="relative h-40 bg-gradient-to-br from-[#0D0D0D] to-[#151515] rounded-2xl border border-[#C8A96A]/5 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-pattern-islamic opacity-[0.03]" />
                   <Map className="w-24 h-24 text-[#C8A96A]/20" />
                   {/* Dummy map dots */}
                   <div className="absolute w-2 h-2 rounded-full bg-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,1)] top-1/2 left-1/2" />
                   <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A96A]/60 top-1/3 left-1/3" />
                </div>
              </div>
              <div className="w-40 border-r border-[#C8A96A]/10 pr-6 pt-2">
                <p className="text-[10px] text-[#F7F5F0]/40 uppercase tracking-widest mb-4">أداء المناطق</p>
                <div className="space-y-3">
                  {[
                    { name: 'السعودية', value: 72 },
                    { name: 'الإمارات', value: 61 },
                    { name: 'مصر', value: 48 },
                    { name: 'الأردن', value: 39 },
                    { name: 'الكويت', value: 33 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="text-[#F7F5F0]/80">{r.name}</span>
                      <span className="font-sans text-[#C8A96A]">{r.value}%</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[9px] text-[#F7F5F0]/30 hover:text-[#C8A96A]">عرض كل المناطق</button>
              </div>
            </div>

          </div>

          {/* Column 2: Pricing, Restock */}
          <div className="xl:col-span-6 space-y-8">
            
            {/* Pricing Tiers */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8A96A]/5 rounded-full blur-[80px]" />
              <h3 className="text-xl font-bold text-[#F7F5F0] mb-2 relative z-10 text-center">التسعير</h3>
              <p className="text-[10px] text-[#F7F5F0]/40 tracking-widest uppercase mb-8 text-center relative z-10">اختر فئة التسعير</p>
              
              <div className="flex gap-4 justify-center items-end h-48 mb-8 relative z-10">
                
                {/* Basic */}
                <div className="w-28 border border-[#C8A96A]/20 rounded-t-full bg-[#0D0D0D] flex flex-col items-center justify-end pb-6 h-36">
                  <h4 className="font-bold text-[#F7F5F0] mb-1">أساسية</h4>
                  <p className="text-[9px] text-[#F7F5F0]/40 font-sans mb-3 text-center px-2">الطلب من 1 - 50</p>
                  <span className="text-lg font-bold font-sans text-[#C8A96A]">3%</span>
                  <p className="text-[8px] text-[#C8A96A] uppercase">خصم</p>
                </div>

                {/* Silver (Active) */}
                <div className="w-32 border-2 border-[#C8A96A] rounded-t-full bg-gradient-to-t from-[#C8A96A]/20 to-transparent flex flex-col items-center justify-end pb-8 h-48 shadow-[0_-20px_40px_rgba(200,169,106,0.15)] relative">
                  <div className="absolute top-4 w-6 h-6 border border-[#C8A96A] rounded-full flex items-center justify-center rotate-45">
                    <div className="w-2 h-2 bg-[#C8A96A] rotate-45" />
                  </div>
                  <h4 className="font-bold text-[#F7F5F0] text-lg mb-1">فضية</h4>
                  <p className="text-[9px] text-[#F7F5F0]/60 font-sans mb-4 text-center px-2">الطلب من 51 - 200</p>
                  <span className="text-2xl font-bold font-sans text-[#C8A96A]">7%</span>
                  <p className="text-[9px] font-bold text-[#C8A96A] uppercase">خصم</p>
                </div>

                {/* Gold */}
                <div className="w-28 border border-[#C8A96A]/20 rounded-t-full bg-[#0D0D0D] flex flex-col items-center justify-end pb-6 h-40">
                  <h4 className="font-bold text-[#F7F5F0] mb-1">ذهبية</h4>
                  <p className="text-[9px] text-[#F7F5F0]/40 font-sans mb-3 text-center px-2">الطلب من 201+</p>
                  <span className="text-lg font-bold font-sans text-[#C8A96A]">12%</span>
                  <p className="text-[8px] text-[#C8A96A] uppercase">خصم</p>
                </div>

              </div>

              <div className="border-t border-[#C8A96A]/10 pt-6 relative z-10">
                <p className="text-[10px] text-[#C8A96A] font-bold mb-4">مزايا إضافية</p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-[#0D0D0D] border border-[#C8A96A]/10 p-3 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center"><Truck className="w-4 h-4"/></div>
                    <p className="text-[9px] font-bold text-[#F7F5F0]">شحن مجاني<br/>للطلبات الكبيرة</p>
                  </div>
                  <div className="flex-1 bg-[#0D0D0D] border border-[#C8A96A]/10 p-3 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center"><Store className="w-4 h-4"/></div>
                    <p className="text-[9px] font-bold text-[#F7F5F0]">أولوية في<br/>التوفر</p>
                  </div>
                  <div className="flex-1 bg-[#0D0D0D] border border-[#C8A96A]/10 p-3 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center"><Megaphone className="w-4 h-4"/></div>
                    <p className="text-[9px] font-bold text-[#F7F5F0]">دعم تسويقي<br/>مشترك</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restock */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#F7F5F0]">إعادة الطلب</h3>
                <p className="text-[10px] text-[#C8A96A] tracking-widest uppercase">منتجاتك الأكثر طلباً</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'معمول تمر', img: 'https://images.unsplash.com/photo-1590076214667-548c3b7b2825?q=80&w=200&auto=format&fit=crop', stat: '25 يوم' },
                  { name: 'تمر سكري', img: 'https://images.unsplash.com/photo-1590076214667-548c3b7b2825?q=80&w=200&auto=format&fit=crop', stat: '18 يوم' },
                  { name: 'تمر خلاص فاخر', img: 'https://images.unsplash.com/photo-1590076214667-548c3b7b2825?q=80&w=200&auto=format&fit=crop', stat: '12 يوم' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0D0D0D] border border-[#C8A96A]/10 rounded-2xl p-3 text-center group cursor-pointer hover:border-[#C8A96A]/30 transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-3 border border-[#C8A96A]/20">
                      <img src={item.img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <p className="text-[10px] font-bold text-[#F7F5F0] mb-1">{item.name}</p>
                    <p className="text-[8px] text-[#F7F5F0]/40 font-sans mb-3">آخر طلب: {item.stat}</p>
                    <button className="w-full py-1.5 text-[9px] font-bold text-[#C8A96A] bg-[#C8A96A]/10 rounded-lg group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-colors">إعادة طلب</button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Account Status Footer */}
          <div className="xl:col-span-12 bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 flex items-center justify-between shadow-xl">
             <div className="flex-1 border-l border-[#C8A96A]/10 text-center">
                <p className="text-[10px] text-[#F7F5F0]/40 tracking-widest uppercase mb-1">حالة الحساب</p>
             </div>
             <div className="flex-1 border-l border-[#C8A96A]/10 px-8 flex justify-between items-center">
                <div className="text-right">
                   <p className="text-[10px] text-[#F7F5F0]/50 mb-1">الحد الائتماني</p>
                   <p className="text-xl font-sans font-bold text-[#F7F5F0]">120,000 ر.س</p>
                </div>
                <div className="w-px h-8 bg-[#C8A96A]/20" />
                <div className="text-right">
                   <p className="text-[10px] text-[#F7F5F0]/50 mb-1">المتاح</p>
                   <p className="text-xl font-sans font-bold text-[#F7F5F0]">48,500 ر.س</p>
                </div>
                <div className="w-px h-8 bg-[#C8A96A]/20" />
                <div className="text-right">
                   <p className="text-[10px] text-[#C8A96A] mb-1">المستحق الحالي</p>
                   <p className="text-xl font-sans font-bold text-[#C8A96A]">71,500 ر.س</p>
                   <p className="text-[8px] text-[#F7F5F0]/30 font-sans tracking-widest mt-1">موعد السداد: 2024/06/30</p>
                </div>
             </div>
             <div className="flex-1 px-8 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-[#F7F5F0]/50 mb-1">تقييمك</p>
                  <div className="flex text-[#C8A96A] gap-1 mb-1">
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current" />
                     <Star className="w-3 h-3 fill-current opacity-50" />
                  </div>
                  <p className="text-[9px] text-[#C8A96A]">شريك موثوق</p>
                </div>
                <p className="text-lg font-bold font-sans text-[#F7F5F0]">4.8 <span className="text-[10px] text-[#F7F5F0]/40">/ 5</span></p>
             </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Communication / Live Feed Panel */}
      <div className="w-80 border-r border-[#C8A96A]/10 bg-[#0A0A0A] p-8 flex flex-col z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C8A96A]/10">
          <h2 className="text-xl font-bold text-[#F7F5F0]">نشاط الطلبات</h2>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-sans tracking-widest text-green-500">Live</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C8A96A]/30 to-transparent" />
          <div className="space-y-8 relative pb-8">
            {[
              { title: 'تم تأكيد طلب جديد', id: '#O-2024-2210', time: 'الآن', icon: CheckCircle2, color: '#10b981' },
              { title: 'تم شحن طلب', id: '#O-2024-2198', time: 'منذ ساعتين', icon: Truck, color: '#C8A96A' },
              { title: 'تم تسليم طلب', id: '#O-2024-2144', time: 'أمس', icon: CheckCircle2, color: '#10b981' },
              { title: 'تم إنشاء طلب عرض سعر', id: '#O-2024-3341', time: 'أمس', icon: Activity, color: '#3b82f6' },
            ].map((ev, i) => (
              <div key={i} className="relative z-10 pl-2 pr-10">
                <div className="absolute right-1.5 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[#0A0A0A] border-[#F7F5F0]/20 text-[#F7F5F0]/50" style={{ borderColor: ev.color }}>
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ev.color }} />
                </div>
                <div className="mb-1 flex items-center justify-between">
                   <p className="text-xs font-bold text-[#F7F5F0]">{ev.title}</p>
                   <p className="text-[9px] text-[#F7F5F0]/30 font-sans">{ev.time}</p>
                </div>
                <div className="p-3 rounded-xl border bg-[#151515] border-[#F7F5F0]/10 flex items-center justify-between">
                   <p className="text-[10px] text-[#F7F5F0]/70 font-sans tracking-widest">{ev.id}</p>
                   <ev.icon className="w-3 h-3" style={{ color: ev.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-6 w-full py-3.5 border border-[#C8A96A]/30 rounded-xl text-xs font-bold text-[#F7F5F0]/50 hover:text-[#C8A96A] hover:bg-[#C8A96A]/10 transition-colors flex items-center justify-center gap-2">
           عرض كل النشاط
        </button>
      </div>

    </div>
  );
}
