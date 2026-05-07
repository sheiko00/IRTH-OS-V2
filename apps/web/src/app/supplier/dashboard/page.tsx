'use client';

import { useEffect, useState } from 'react';
import { 
  Package, CheckCircle2, Clock, FileText, Upload, 
  Activity, AlertCircle, History, Box, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocket } from '@/hooks/use-socket';

const INITIAL_ACTIVITIES = [
  {
    id: '1',
    type: 'BATCH',
    title: 'تحديث حالة التشغيلة',
    message: 'تم نقل التشغيلة B-2026-004 إلى مرحلة الإنتاج الفعلي.',
    time: 'منذ ١٠ دقائق',
    icon: Package,
    color: '#C8A96A'
  },
  {
    id: '2',
    type: 'FILE',
    title: 'شهادة التحليل مطلوبة',
    message: 'يرجى رفع شهادة التحليل (COA) للمنتج "سيروم النضارة".',
    time: 'منذ ساعة',
    icon: FileText,
    color: '#ef4444'
  }
];

export default function SupplierDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { socket, isConnected } = useSocket(token || undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('batch.updated', (batch: any) => {
        const newActivity = {
          id: `batch-${batch.id}-${Date.now()}`,
          type: 'BATCH',
          title: 'تحديث إنتاج حي',
          message: `تم تحديث حالة التشغيلة ${batch.batchNo} إلى: ${batch.status}`,
          time: 'الآن',
          icon: Activity,
          color: '#C8A96A'
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      });

      socket.on('message.new', (msg: any) => {
        const newActivity = {
          id: `msg-${msg.id}`,
          type: 'MESSAGE',
          title: 'رسالة جديدة من الإدارة',
          message: msg.content,
          time: 'الآن',
          icon: History,
          color: '#3b82f6'
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      });
    }
    return () => {
      if (socket) {
        socket.off('batch.updated');
        socket.off('message.new');
      }
    };
  }, [socket]);

  if (!mounted) return null;

  return (
    <div className="space-y-8 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#F7F5F0]">بوابة الموردين</h1>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-500",
              isConnected ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
            )}>
              <span className="relative flex h-2 w-2">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={cn("relative inline-flex rounded-full h-2 w-2", isConnected ? "bg-green-500" : "bg-red-500")}></span>
              </span>
              <span className={cn("text-xs font-sans tracking-widest", isConnected ? "text-green-500" : "text-red-500")}>
                {isConnected ? "متصل بالمركز" : "غير متصل"}
              </span>
            </div>
          </div>
          <p className="text-[#F7F5F0]/60">مرحباً بك مجدداً، معامل الإرث المتميزة.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <Upload className="w-4 h-4" /> رفع مستند جديد
          </button>
        </div>
      </div>

      {/* Production Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'تشغيلات نشطة', value: '٣', icon: Box, color: '#C8A96A' },
          { label: 'جاهز للاستلام', value: '١', icon: CheckCircle2, color: '#10b981' },
          { label: 'فواتير معلقة', value: '٢', icon: FileText, color: '#f59e0b' },
          { label: 'وقت التسليم المتوقع', value: '٥ أيام', icon: Clock, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#151515] border border-[#C8A96A]/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#C8A96A]/5" style={{ color: item.color }}>
                <item.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#F7F5F0] mb-1 font-sans">{item.value}</h3>
            <p className="text-xs text-[#F7F5F0]/40 font-medium tracking-wide">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Production Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#C8A96A]">متابعة الإنتاج</h2>
            <button className="text-xs text-[#F7F5F0]/40 hover:text-[#C8A96A] transition-colors">عرض السجل الكامل</button>
          </div>

          <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 md:p-8">
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 md:gap-6 items-start animate-fade-down">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#C8A96A]/20 flex items-center justify-center flex-shrink-0" style={{ color: activity.color }}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-[#F7F5F0]">{activity.title}</p>
                      <span className="text-[10px] text-[#F7F5F0]/30 font-sans">{activity.time}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0D0D0D]/50 border border-[#C8A96A]/5 hover:border-[#C8A96A]/20 transition-all cursor-pointer">
                      <p className="text-xs text-[#F7F5F0]/60 leading-relaxed">{activity.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#F7F5F0] mb-6">إجراءات مطلوبة</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50"></div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#F7F5F0] mb-1">نقص في بيانات المواد الخام</p>
                    <p className="text-xs text-[#F7F5F0]/50 mb-4 leading-relaxed">لم يتم إرفاق بيانات المصدر لشحنة "زيت العود" الأخيرة.</p>
                    <button className="text-[10px] font-bold text-red-400 bg-red-400/10 px-4 py-2 rounded-lg hover:bg-red-400/20 transition-all w-full">إكمال البيانات</button>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#C8A96A]/20 bg-[#151515] relative overflow-hidden group">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#C8A96A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#F7F5F0] mb-1">فاتورة بانتظار التوقيع</p>
                    <p className="text-xs text-[#F7F5F0]/50 mb-4 leading-relaxed">فاتورة رقم INV-2026-88 جاهزة للمراجعة والاعتماد.</p>
                    <button className="text-[10px] font-bold text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-2 rounded-lg hover:bg-[#C8A96A]/20 transition-all w-full">عرض الفاتورة</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#244F3A]/20 to-transparent border border-[#244F3A]/30">
            <h3 className="text-sm font-bold text-[#244F3A] mb-2 flex items-center gap-2">
              <History className="w-4 h-4" /> مركز الدعم المباشر
            </h3>
            <p className="text-[11px] text-[#F7F5F0]/40 mb-4">تواصل مباشرة مع فريق الجودة والعمليات في إرث.</p>
            <button className="w-full py-3 rounded-xl bg-[#244F3A] text-white text-xs font-bold hover:bg-[#1d3f2e] transition-all flex items-center justify-center gap-2">
              فتح محادثة جديدة <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
