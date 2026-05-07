'use client';

import { useEffect, useState } from 'react';
import { 
  Package, CheckCircle2, Clock, FileText, Upload, 
  Activity, AlertCircle, History, Box, ChevronLeft, ShieldCheck, Plus
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
    <div className="font-serif animate-fade-in rtl h-full flex -m-10" dir="rtl">
      
      {/* LEFT HALF: Main Supplier Hub */}
      <div className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-8">
        
        {/* Top Header */}
        <div className="flex items-end justify-between border-b border-[#C8A96A]/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 bg-[#151515] flex items-center justify-center shadow-[0_0_15px_rgba(200,169,106,0.15)]">
                <span className="text-xl text-[#C8A96A]">إ</span>
              </div>
              بوابة المورد
            </h1>
            <p className="text-[#C8A96A] text-sm tracking-widest uppercase">شريك في صناعة الإرث</p>
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
          
          {/* Column 1: Upload & Assigned Orders & Payments */}
          <div className="xl:col-span-5 space-y-8">
            
            {/* Upload Files */}
            <div className="relative rounded-[3rem] border border-[#C8A96A]/20 bg-[#0D0D0D]/80 backdrop-blur-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] h-64 flex flex-col">
              <div className="absolute inset-0 bg-pattern-islamic opacity-[0.06] pointer-events-none mix-blend-overlay" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96A]/60 to-transparent shadow-[0_0_15px_rgba(200,169,106,0.3)]" />
              
              <div className="px-8 py-5 border-b border-[#C8A96A]/10 relative z-10 flex items-center justify-center">
                 <h3 className="text-xl font-bold text-[#F7F5F0]">رفع الملفات</h3>
              </div>
              
              <div className="flex-1 p-6 relative z-10">
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[#C8A96A]/20 rounded-[2rem] hover:bg-[#C8A96A]/5 transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 text-[#C8A96A] mb-3 group-hover:-translate-y-1 transition-transform" />
                  <p className="text-xs font-bold text-[#F7F5F0] mb-2 text-center">اسحب وأفلت الملفات هنا<br/>أو اضغط للاختيار</p>
                  <p className="text-[9px] text-[#F7F5F0]/30 tracking-widest uppercase">PDF, DOCX, XLSX, JPG, PNG</p>
                  <p className="text-[9px] text-[#F7F5F0]/30 tracking-widest mt-1">الحد الأقصى 5MB</p>
                </div>
              </div>
            </div>

            {/* Assigned Orders */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#F7F5F0]">طلبات مسندة</h3>
                <div className="flex gap-4 border-b border-[#C8A96A]/20">
                  <button className="px-2 pb-2 text-xs text-[#F7F5F0]/40">الكل</button>
                  <button className="px-2 pb-2 text-xs text-[#C8A96A] font-bold border-b-2 border-[#C8A96A]">نشطة</button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'ORD-2024-8821', product: 'تمر خلاص فاخر', weight: '5,000 كغ', date: 'التسليم: 2024/06/20', status: 'قيد الإنتاج' },
                  { id: 'ORD-2024-8790', product: 'تمر عجوة المدينة', weight: '3,000 كغ', date: 'التسليم: 2024/06/18', status: 'قيد الإنتاج' },
                ].map((ord, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D]/50 hover:border-[#C8A96A]/30 transition-all flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] bg-[#C8A96A]/5">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#C8A96A] font-sans tracking-wider mb-1">{ord.id}</p>
                        <p className="text-sm font-bold text-[#F7F5F0] mb-1">{ord.product}</p>
                        <p className="text-xs text-[#F7F5F0]/60">{ord.weight}</p>
                      </div>
                    </div>
                    <div className="text-left flex flex-col items-end">
                      <p className="text-[10px] text-[#F7F5F0]/40 mb-3 font-sans tracking-wider">{ord.date}</p>
                      <span className="text-[9px] font-bold text-[#C8A96A] bg-[#C8A96A]/10 px-2 py-1 rounded-md">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-[10px] uppercase tracking-widest font-bold text-[#C8A96A] border border-[#C8A96A]/20 py-3 rounded-xl hover:bg-[#C8A96A]/10 transition-colors">عرض جميع الطلبات</button>
            </div>

            {/* Documents */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-[#F7F5F0] mb-6">مستنداتك</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {[
                  { title: 'شهادة منشأ', status: 'معتمد' },
                  { title: 'شهادة جودة', status: 'معتمد' },
                  { title: 'تحليل مخبري', status: 'قيد المراجعة', pending: true },
                  { title: 'فاتورة ضريبية', status: 'معتمد' },
                  { title: 'شهادة حلال', status: 'معتمد' },
                ].map((doc, i) => (
                  <div key={i} className="min-w-[90px] flex flex-col items-center justify-center p-4 rounded-2xl border border-[#C8A96A]/10 bg-[#0D0D0D]/50 hover:bg-[#C8A96A]/5 transition-all text-center group">
                    <FileText className={cn("w-6 h-6 mb-3 transition-transform group-hover:scale-110", doc.pending ? "text-[#f59e0b]" : "text-[#C8A96A]")} />
                    <p className="text-[10px] font-bold text-[#F7F5F0] mb-1">{doc.title}</p>
                    <p className="text-[9px] text-[#F7F5F0]/40 uppercase tracking-widest font-sans">PDF</p>
                    <span className={cn("mt-3 text-[8px] font-bold px-2 py-1 rounded", doc.pending ? "bg-[#f59e0b]/10 text-[#f59e0b]" : "bg-green-500/10 text-green-500")}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-[10px] uppercase tracking-widest font-bold text-[#F7F5F0]/50 hover:text-[#C8A96A] text-center">عرض كل المستندات</button>
            </div>

          </div>

          {/* Column 2: Batches, Quality, Payments */}
          <div className="xl:col-span-7 space-y-8">
            
            {/* Production Batches */}
            <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96A]/5 rounded-full blur-[80px]" />
              <h3 className="text-xl font-bold text-[#F7F5F0] mb-12 relative z-10 text-center">دفعات الإنتاج</h3>
              
              <div className="relative flex justify-between items-center z-10 px-8 pb-4">
                <div className="absolute top-1/2 -translate-y-[20px] left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/50 to-transparent" />
                {[
                  { id: '1047', product: 'تمر خلاص فاخر', status: 'قيد الإنتاج', progress: 60 },
                  { id: '1046', product: 'تمر عجوة المدينة', status: 'في الفحص', progress: 80 },
                  { id: '1045', product: 'معمول تمر فاخر', status: 'مكتملة', progress: 100 },
                ].map((batch, i) => (
                  <div key={i} className="relative flex flex-col items-center bg-[#151515] px-4 w-32">
                    <div className={cn(
                      "w-20 h-20 rounded-full border-[3px] flex items-center justify-center mb-5 bg-[#0D0D0D] z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                      batch.progress === 100 ? "border-[#C8A96A] text-[#C8A96A] shadow-[0_0_30px_rgba(200,169,106,0.2)]" : "border-[#C8A96A]/30 text-[#F7F5F0]/30"
                    )}>
                      {batch.progress === 100 ? (
                         <div className="w-14 h-14 rounded-full border border-[#C8A96A]/40 flex items-center justify-center bg-[#C8A96A]/10">
                           <span className="text-[#C8A96A] font-serif text-2xl font-bold">إ</span>
                         </div>
                      ) : (
                         <div className="w-14 h-14 rounded-full border border-[#C8A96A]/20 flex items-center justify-center">
                           <span className="text-[#F7F5F0]/30 font-serif text-xl">إ</span>
                         </div>
                      )}
                    </div>
                    <p className="text-[10px] text-[#F7F5F0]/50 tracking-widest font-sans mb-1.5 uppercase">دفعة {batch.id}</p>
                    <p className="text-xs font-bold text-[#F7F5F0] mb-3 text-center leading-tight">{batch.product}</p>
                    <span className={cn("text-[9px] font-bold px-2.5 py-1 rounded-md border", 
                      batch.progress === 100 ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-[#C8A96A]/10 text-[#C8A96A] border-[#C8A96A]/20"
                    )}>
                      {batch.status}
                    </span>
                    <div className="flex items-center gap-2 mt-4 w-full">
                      <div className="w-6 h-6 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center text-[8px] text-[#F7F5F0]/40">
                         <Box className="w-3 h-3" />
                      </div>
                      <div className="flex-1 h-1.5 bg-[#F7F5F0]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C8A96A]" style={{ width: `${batch.progress}%` }} />
                      </div>
                      <span className="text-[9px] font-sans text-[#F7F5F0]/60 font-bold">{batch.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Checks & Payments */}
            <div className="grid grid-cols-2 gap-8">
              
              {/* Quality */}
              <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-lg font-bold text-[#F7F5F0] mb-8 text-center">فحص الجودة</h3>
                
                <div className="flex justify-between items-center mb-10 relative px-4">
                  <div className="absolute top-2 left-6 right-6 h-[1px] bg-[#C8A96A]/30" />
                  {['اعتماد الجودة', 'فحص مخبري', 'فحص أولي', 'اعتماد الجودة'].map((step, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 bg-[#151515] px-2">
                      <div className="w-4 h-4 rounded-full border-2 border-[#C8A96A] bg-[#0D0D0D] flex items-center justify-center mb-3">
                        {i < 3 && <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />}
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/20 mb-2">
                         <ShieldCheck className="w-3 h-3 text-[#C8A96A]" />
                      </div>
                      <p className="text-[8px] text-[#F7F5F0]/60 text-center w-12 leading-tight">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-green-500/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/5" />
                  <div className="relative z-10">
                     <p className="text-[10px] text-[#F7F5F0]/50 mb-2">نتيجة آخر فحص</p>
                     <p className="text-xl font-bold text-green-500 mb-3 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">جودة ممتازة</p>
                     <div className="flex items-center justify-center gap-3">
                        <span className="text-[10px] text-green-400 bg-green-500/10 px-3 py-1 rounded-md font-bold">معتمد</span>
                        <p className="text-[10px] text-[#F7F5F0]/40 font-sans tracking-widest">2024/06/10</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="bg-[#151515] border border-[#C8A96A]/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <h3 className="text-lg font-bold text-[#F7F5F0] mb-8 text-center">حالة المدفوعات</h3>
                
                <div className="flex gap-4 mb-8">
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-[#F7F5F0]/50 mb-2">إجمالي مستحق</p>
                    <p className="text-xl font-bold font-sans text-[#F7F5F0]">ر.س 42,800</p>
                  </div>
                  <div className="w-px bg-[#C8A96A]/20" />
                  <div className="flex-1 text-center bg-[#C8A96A]/5 rounded-xl border border-[#C8A96A]/10 py-2">
                    <p className="text-[10px] text-[#C8A96A] mb-1">دفعة قادمة</p>
                    <p className="text-lg font-bold font-sans text-[#C8A96A] mb-1">ر.س 15,600</p>
                    <p className="text-[8px] text-[#F7F5F0]/40 font-sans tracking-widest">موعد الصرف: 2024/06/25</p>
                  </div>
                </div>

                <div className="flex justify-between items-center relative px-4">
                  <div className="absolute top-2 left-6 right-6 h-[1px] bg-green-500/30" />
                  {['تم التحويل', 'جاهز للصرف', 'معتمد', 'تم التحويل'].map((step, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 bg-[#151515] px-2">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-[#0D0D0D] flex items-center justify-center mb-4">
                        {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                      </div>
                      <p className="text-[8px] text-[#F7F5F0]/60 text-center w-12 leading-tight">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Communication Panel */}
      <div className="w-80 border-r border-[#C8A96A]/10 bg-[#0A0A0A] p-8 flex flex-col z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C8A96A]/10">
          <h2 className="text-xl font-bold text-[#F7F5F0]">التواصل المباشر</h2>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-sans tracking-widest text-green-500">Live</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C8A96A]/30 to-transparent" />
          <div className="space-y-8 relative pb-8">
            {[
              { sender: 'مسؤول المشتريات', time: 'الآن', text: 'السلام عليكم، تم اعتماد الدفعة 1046 بنجاح', role: 'admin' },
              { sender: 'إدارة الجودة', time: 'منذ 30 دقيقة', text: 'تم رفع تقرير فحص جودة الدفعة 1045', role: 'quality' },
              { sender: 'لوجستيات IRTH', time: 'منذ 2 ساعة', text: 'تم تحديث موعد استلام شحنة دفعة 1047', role: 'logistics' },
              { sender: 'المورد', time: 'منذ 2 ساعة', text: 'تم تجهيز دفعة 1047 بنسبة 60٪', role: 'supplier', isMe: true },
            ].map((msg, i) => (
              <div key={i} className="relative z-10 pl-2 pr-10">
                <div className={cn(
                   "absolute right-1.5 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[#0A0A0A]",
                   msg.isMe ? "border-[#C8A96A] text-[#C8A96A]" : "border-[#F7F5F0]/30 text-[#F7F5F0]/50"
                )}>
                   <div className={cn("w-1.5 h-1.5 rounded-full", msg.isMe ? "bg-[#C8A96A]" : "bg-[#F7F5F0]/30")} />
                </div>
                <div className="mb-1 flex items-center justify-between">
                   <p className="text-xs font-bold text-[#C8A96A]">{msg.sender}</p>
                   <p className="text-[9px] text-[#F7F5F0]/30 font-sans">{msg.time}</p>
                </div>
                <div className={cn(
                   "p-3 rounded-xl border text-[11px] leading-relaxed",
                   msg.isMe ? "bg-[#C8A96A]/5 border-[#C8A96A]/20 text-[#F7F5F0]" : "bg-[#151515] border-[#F7F5F0]/10 text-[#F7F5F0]/70"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-6 w-full py-3.5 border border-[#C8A96A]/30 rounded-xl text-xs font-bold text-[#C8A96A] hover:bg-[#C8A96A]/10 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> بدء محادثة جديدة
        </button>
      </div>

    </div>
  );

}
