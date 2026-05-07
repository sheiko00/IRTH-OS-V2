'use client';

import { useEffect, useState } from 'react';
import { 
  ShoppingCart, Package, Truck, Store, 
  Activity, ArrowUpRight, Clock, Star, ChevronLeft, Megaphone
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
    <div className="space-y-8 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#F7F5F0]">بوابة الموزعين المعتمدين</h1>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-500",
              isConnected ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
            )}>
              <span className="relative flex h-2 w-2">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={cn("relative inline-flex rounded-full h-2 w-2", isConnected ? "bg-green-500" : "bg-red-500")}></span>
              </span>
              <span className={cn("text-xs font-sans tracking-widest", isConnected ? "text-green-500" : "text-red-500")}>
                {isConnected ? "النظام نشط" : "أوفلاين"}
              </span>
            </div>
          </div>
          <p className="text-[#F7F5F0]/60">مرحباً بك، مؤسسة الأفق للتوزيع.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <ShoppingCart className="w-4 h-4" /> إنشاء طلب جديد (B2B)
          </button>
        </div>
      </div>

      {/* Distributor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المبيعات (الشهر)', value: formatCurrency(85400), icon: Star, color: '#C8A96A' },
          { label: 'طلبات قيد الشحن', value: '٢', icon: Truck, color: '#3b82f6' },
          { label: 'رصيد المحفظة', value: formatCurrency(12000), icon: Store, color: '#10b981' },
          { label: 'نسبة النمو', value: '+١٢٪', icon: ArrowUpRight, color: '#10b981' },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#151515] border border-[#C8A96A]/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#C8A96A]/5" style={{ color: item.color }}>
                <item.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#F7F5F0] mb-1">{item.value}</h3>
            <p className="text-xs text-[#F7F5F0]/40 font-medium tracking-wide">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#C8A96A]">أحدث التحديثات</h2>
          </div>

          <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 md:p-8">
            <div className="space-y-6">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex gap-4 md:gap-6 items-start animate-fade-down">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#C8A96A]/20 flex items-center justify-center flex-shrink-0" style={{ color: notif.color }}>
                    <notif.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-[#F7F5F0]">{notif.title}</p>
                      <span className="text-[10px] text-[#F7F5F0]/30 font-sans">{notif.time}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0D0D0D]/50 border border-[#C8A96A]/5 hover:border-[#C8A96A]/20 transition-all">
                      <p className="text-xs text-[#F7F5F0]/60 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#F7F5F0] mb-6">أدوات الموزع</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-2xl border border-[#C8A96A]/10 bg-[#151515] hover:border-[#C8A96A]/30 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#C8A96A]/10 text-[#C8A96A]">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#F7F5F0]">تحميل الكتالوج الجديد</p>
                    <p className="text-[10px] text-[#F7F5F0]/40">نسخة ربيع ٢٠٢٦ - PDF</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-2xl border border-[#C8A96A]/10 bg-[#151515] hover:border-[#C8A96A]/30 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#C8A96A]/10 text-[#C8A96A]">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#F7F5F0]">المواد التسويقية</p>
                    <p className="text-[10px] text-[#F7F5F0]/40">صور وفيديوهات للنشر</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/30">
            <h3 className="text-sm font-bold text-[#244F3A] mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" /> نقاط الولاء للموزعين
            </h3>
            <p className="text-[11px] text-[#F7F5F0]/40 mb-4">لديك ١٢٠٠ نقطة بانتظار الاستبدال بخصومات إضافية.</p>
            <button className="w-full py-3 rounded-xl bg-[#244F3A] text-white text-xs font-bold hover:bg-[#1d3f2e] transition-all flex items-center justify-center gap-2">
              استبدال النقاط <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
