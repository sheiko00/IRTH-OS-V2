'use client';

import { useState } from 'react';
import { 
  Factory, Package, FileText, CheckCircle2, 
  Upload, MessageSquare, Clock, ShieldCheck,
  CreditCard, LayoutDashboard, Settings, LogOut,
  ChevronLeft, Search, Bell, Download, Plus, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function SupplierBoardPage() {
  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. NAVIGATION SIDEBAR */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col p-6 z-50">
        <div className="mb-12 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] bg-[#0D0D0D]">
              <Factory className="w-5 h-5" />
           </div>
           <div>
              <h2 className="text-sm font-bold tracking-wider text-[#F7F5F0]">بوابة المورد</h2>
              <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest mt-0.5">شريك في صناعة الإرث</p>
           </div>
        </div>

        <div className="space-y-4 flex-1">
           <CodexSidebarItem icon={LayoutDashboard} label="الرئيسية" isActive />
           <CodexSidebarItem icon={FileText} label="طلبات مستندة" />
           <CodexSidebarItem icon={Package} label="دفعات الإنتاج" />
           <CodexSidebarItem icon={ShieldCheck} label="فحص الجودة" />
           <CodexSidebarItem icon={Download} label="المستندات" />
           <CodexSidebarItem icon={MessageSquare} label="التواصل" />
           <CodexSidebarItem icon={CreditCard} label="المدفوعات" />
           <CodexSidebarItem icon={BarChart3} label="الأداء" />
        </div>

        <div className="mt-auto space-y-4">
           <CodexSidebarItem icon={Bell} label="الإشعارات" />
           <CodexSidebarItem icon={Settings} label="الإعدادات" />
           <button className="flex items-center gap-4 px-4 py-3 text-red-500/60 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest mt-4">
              <LogOut className="w-5 h-5" /> تسجيل الخروج
           </button>
        </div>
      </aside>

      {/* 02. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] border border-[#C8A96A]/10 rounded-t-full -z-10 opacity-10 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
            
            {/* Left Column: File Vault & Active Requests */}
            <div className="lg:col-span-1 space-y-10">
               {/* Arched File Vault */}
               <div className="p-8 rounded-t-[5rem] rounded-b-3xl border border-[#C8A96A]/15 bg-[#151515]/30 flex flex-col items-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none" />
                  <div className="w-20 h-32 rounded-t-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A]/40 mb-6 group-hover:border-[#C8A96A] transition-all">
                     <Upload className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F7F5F0] mb-2">رفع الملفات</h3>
                  <p className="text-[10px] text-[#F7F5F0]/40 leading-relaxed mb-6">اسحب وأفلت الملفات هنا أو اضغط للاختيار</p>
                  <button className="w-full py-3 rounded-xl bg-[#C8A96A] text-[#0D0D0D] text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">اختيار الملفات</button>
                  <p className="text-[8px] text-[#F7F5F0]/20 mt-4">PDF, DOCX, XLSX, JPG, PNG (بحد أقصى ٢٠ ميجا)</p>
               </div>

               {/* Active Document Requests */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">طلبات مستندة</h3>
                  <div className="space-y-4">
                     {[
                        { id: 'ORD-2024-8821', title: 'تمر خلاص فاخر', qty: '٥,٠٠٠ كغ', status: 'قيد الإنتاج' },
                        { id: 'ORD-2024-8790', title: 'تمر عجوة المدينة', qty: '٣,٠٠٠ كغ', status: 'قيد الإنتاج' },
                     ].map((req, i) => (
                        <div key={i} className="p-5 rounded-2xl border border-[#C8A96A]/10 bg-[#151515]/20 group hover:border-[#C8A96A]/30 transition-all">
                           <div className="flex justify-between items-start mb-3">
                              <p className="text-[9px] text-[#C8A96A] font-bold uppercase tracking-widest">{req.id}</p>
                              <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#C8A96A]/10 text-[#C8A96A]">{req.status}</span>
                           </div>
                           <h4 className="text-sm font-bold text-[#F7F5F0] mb-1">{req.title}</h4>
                           <p className="text-xs text-[#F7F5F0]/40 mb-4">{req.qty}</p>
                           <button className="w-full py-2 rounded-lg bg-[#0D0D0D] border border-[#C8A96A]/10 text-[9px] font-bold text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-all">تحديث الحالة</button>
                        </div>
                     ))}
                  </div>
                  <button className="w-full text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest opacity-60">عرض جميع الطلبات</button>
               </div>
            </div>

            {/* Center/Right Column: Main Flows */}
            <div className="lg:col-span-3 space-y-12">
               {/* Production Batches Flow */}
               <CodexArch title="دفعات الإنتاج" subtitle="تتبع مراحل التصنيع اللحظية">
                  <div className="flex gap-8 p-10 overflow-x-auto no-scrollbar">
                     {[
                        { id: '1047', title: 'تمر خلاص فاخر', progress: 60, status: 'قيد الإنتاج' },
                        { id: '1046', title: 'تمر عجوة المدينة', progress: 80, status: 'في الفحص' },
                        { id: '1045', title: 'معمول تمر فاخر', progress: 100, status: 'مكتملة' },
                     ].map((batch, i) => (
                        <div key={i} className="flex flex-col items-center gap-6 min-w-[200px]">
                           <div className="relative w-24 h-24 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#C8A96A]/10" />
                                 <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={276} strokeDashoffset={276 - (276 * batch.progress) / 100} className="text-[#C8A96A] transition-all duration-1000" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-16 h-16 rounded-full border border-[#C8A96A]/20 flex items-center justify-center bg-[#0D0D0D]">
                                    <p className="text-xs font-bold text-[#C8A96A]">{batch.progress}%</p>
                                 </div>
                              </div>
                           </div>
                           <div className="text-center">
                              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">دفعة {batch.id}</p>
                              <h4 className="text-sm font-bold text-[#F7F5F0] mb-2">{batch.title}</h4>
                              <span className={cn(
                                 "px-3 py-1 rounded-full text-[9px] font-bold",
                                 batch.progress === 100 ? "bg-[#244F3A]/30 text-[#A9D3B8]" : "bg-[#C8A96A]/10 text-[#C8A96A]"
                              )}>{batch.status}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </CodexArch>

               {/* Quality Checkpoint & Live Communication Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Quality Checkpoints */}
                  <CodexArch title="فحص الجودة" subtitle="اعتماد المعايير والمقاييس">
                     <div className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                           {[
                              { label: 'اعتماد الجودة', active: true },
                              { label: 'فحص مخبري', active: true },
                              { label: 'فحص أولي', active: true },
                              { label: 'اعتماد المورد', active: true },
                           ].map((step, i) => (
                              <div key={i} className="flex flex-col items-center gap-3">
                                 <div className={cn(
                                    "w-3 h-3 rounded-full border-2 transition-all",
                                    step.active ? "bg-[#C8A96A] border-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,0.5)]" : "bg-transparent border-[#C8A96A]/20"
                                 )} />
                                 <p className={cn("text-[8px] font-bold uppercase tracking-widest", step.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/20")}>{step.label}</p>
                              </div>
                           ))}
                        </div>
                        <div className="p-6 rounded-2xl bg-[#C8A96A]/5 border border-[#C8A96A]/10 flex items-center justify-between">
                           <div>
                              <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">نتيجة آخر فحص</p>
                              <p className="text-lg font-bold text-[#F7F5F0]">جودة ممتازة</p>
                           </div>
                           <span className="px-4 py-1.5 rounded-full bg-[#244F3A]/30 text-[#A9D3B8] text-[10px] font-bold border border-[#244F3A]/50">معتمد ✓</span>
                        </div>
                     </div>
                  </CodexArch>

                  {/* Live Communication Chat Widget */}
                  <CodexArch title="التواصل المباشر" subtitle="محادثة مع فريق العمليات">
                     <div className="p-6 flex flex-col h-[280px]">
                        <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                           <div className="flex flex-col items-end">
                              <div className="bg-[#151515] border border-[#C8A96A]/10 p-3 rounded-xl rounded-tr-none max-w-[80%]">
                                 <p className="text-[11px] text-[#F7F5F0]/80 leading-relaxed">السلام عليكم. تم اعتماد دفعة 1046 بنجاح.</p>
                              </div>
                              <span className="text-[8px] text-[#F7F5F0]/20 mt-1">١١:٠٠ ص</span>
                           </div>
                           <div className="flex flex-col items-start">
                              <div className="bg-[#C8A96A]/10 border border-[#C8A96A]/20 p-3 rounded-xl rounded-tl-none max-w-[80%]">
                                 <p className="text-[11px] text-[#C8A96A] leading-relaxed italic">شكراً لكم. سنقوم بشحنها غداً.</p>
                              </div>
                              <span className="text-[8px] text-[#F7F5F0]/20 mt-1">١١:٠٥ ص</span>
                           </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                           <input type="text" placeholder="اكتب رسالتك..." className="flex-1 bg-[#151515] border border-[#C8A96A]/10 rounded-xl px-4 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A]/30" />
                           <button className="w-10 h-10 rounded-xl bg-[#C8A96A] flex items-center justify-center text-[#0D0D0D] hover:scale-105 transition-transform">
                              <Plus className="w-5 h-5 rotate-45" />
                           </button>
                        </div>
                     </div>
                  </CodexArch>
               </div>

               {/* Payout & Payment Status */}
               <CodexArch title="حالة المدفوعات" subtitle="تتبع التسوية المالية">
                  <div className="p-8 grid grid-cols-3 gap-8">
                     <div className="p-6 rounded-2xl bg-[#0D0D0D]/60 border border-[#C8A96A]/10">
                        <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">إجمالي مستحق</p>
                        <p className="text-2xl font-bold text-[#F7F5F0]">٤٢,٨٠٠ ر.س</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-[#0D0D0D]/60 border border-[#C8A96A]/10">
                        <p className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mb-1">دفعة قادمة</p>
                        <p className="text-2xl font-bold text-[#F7F5F0]">١٥,٦٠٠ ر.س</p>
                        <p className="text-[9px] text-[#F7F5F0]/30 mt-2 font-sans tracking-widest">موعد الصرف: 2024/06/25</p>
                     </div>
                     <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-10 relative">
                           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#C8A96A]/20" />
                           {[
                              { label: 'تم التحويل', active: true },
                              { label: 'معتمد', active: true },
                              { label: 'جاهز للصرف', active: true },
                              { label: 'تم التحويل', active: false },
                           ].map((step, i) => (
                              <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                 <div className={cn("w-3 h-3 rounded-full border-2", step.active ? "bg-[#C8A96A] border-[#C8A96A]" : "bg-[#0D0D0D] border-[#C8A96A]/20")} />
                                 <p className={cn("text-[8px] font-bold uppercase tracking-widest whitespace-nowrap", step.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/20")}>{step.label}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </CodexArch>

               {/* Bottom Document Vault */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#F7F5F0] mr-2">مستنداتك</h3>
                  <div className="grid grid-cols-6 gap-4">
                     {[
                        { label: 'شهادة منشأ', type: 'PDF' },
                        { label: 'شهادة جودة', type: 'PDF' },
                        { label: 'تحليل مخبري', type: 'PDF' },
                        { label: 'فاتورة ضريبية', type: 'PDF' },
                        { label: 'شهادة حلال', type: 'PDF' },
                        { label: 'عرض الكل', type: 'FOLDER' },
                     ].map((doc, i) => (
                        <div key={i} className="group p-5 rounded-[2rem] border border-[#C8A96A]/10 bg-[#151515]/20 flex flex-col items-center text-center hover:border-[#C8A96A]/40 transition-all cursor-pointer">
                           <div className="w-12 h-16 rounded-t-xl rounded-b-md border border-[#C8A96A]/20 bg-[#0D0D0D] flex items-center justify-center text-[#C8A96A]/30 mb-4 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all">
                              <FileText className="w-6 h-6" />
                           </div>
                           <p className="text-[10px] font-bold text-[#F7F5F0]/80 mb-1">{doc.label}</p>
                           <p className="text-[8px] text-[#C8A96A] uppercase font-sans tracking-widest">{doc.type}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* Overlays */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151515] border border-[#C8A96A]/10 text-[9px] font-bold text-[#F7F5F0]/60">
            <Clock className="w-3.5 h-3.5 text-[#C8A96A]" /> آخر تحديث: الآن
         </div>
         <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40">
            <Bell className="w-5 h-5" />
         </div>
      </div>
    </div>
  );
}

function BarChart3(props: any) { return <Factory {...props} /> }
