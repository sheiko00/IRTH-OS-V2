'use client';

import { useState } from 'react';
import { 
  Megaphone, LayoutDashboard, Layers, Users, Calendar, 
  DollarSign, BarChart3, Settings, Crown, Share2, 
  MessageSquare, Play, Video, Type, Image as ImageIcon,
  CheckCircle2, Clock, MoreVertical, Search, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CodexArch, 
  CodexMetricSeal, 
  CodexPathStep, 
  CodexSidebarItem 
} from '@/components/codex/codex-primitives';

export default function MarketingBoardPage() {
  const [activeModule, setActiveModule] = useState('campaigns');

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#F7F5F0] overflow-hidden font-serif rtl" dir="rtl">
      
      {/* 01. MAIN SIDEBAR (Role & Core Navigation) */}
      <aside className="w-20 flex flex-col items-center py-8 border-l border-[#C8A96A]/10 bg-[#0A0A0A] z-50">
        <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] mb-12 shadow-[0_0_20px_rgba(200,169,106,0.1)]">
          <Crown className="w-6 h-6" />
        </div>
        <nav className="flex-1 flex flex-col gap-8">
           <button className="p-3 text-[#C8A96A] bg-[#C8A96A]/10 rounded-xl"><Megaphone className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><LayoutDashboard className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><Users className="w-6 h-6" /></button>
           <button className="p-3 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><DollarSign className="w-6 h-6" /></button>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#B6975A] border border-[#C8A96A]/40 flex items-center justify-center text-[#0D0D0D] font-bold text-xs">م</div>
           <p className="text-[10px] text-[#C8A96A] uppercase tracking-widest font-bold">المؤسس</p>
        </div>
      </aside>

      {/* 02. MODULE SIDEBAR (Marketing Sub-navigation) */}
      <aside className="w-64 border-l border-[#C8A96A]/10 bg-[#0D0D0D] flex flex-col p-6 z-40">
        <div className="mb-10">
           <h2 className="text-xl font-bold tracking-tight text-[#F7F5F0]">لوحة التسويق</h2>
           <p className="text-[9px] text-[#C8A96A] uppercase tracking-[0.3em] mt-1">نشر عبق الإرث النبوي</p>
        </div>
        
        <div className="space-y-4">
           <CodexSidebarItem icon={LayoutDashboard} label="غرفة القيادة" isActive={activeModule === 'dashboard'} onClick={() => setActiveModule('dashboard')} />
           <CodexSidebarItem icon={Megaphone} label="حملات الإرث" isActive={activeModule === 'campaigns'} onClick={() => setActiveModule('campaigns')} />
           <CodexSidebarItem icon={Layers} label="مكتبة الإرث" isActive={activeModule === 'content'} onClick={() => setActiveModule('content')} />
           <CodexSidebarItem icon={Users} label="سفراء العلامة" isActive={activeModule === 'influencers'} onClick={() => setActiveModule('influencers')} />
           <CodexSidebarItem icon={Calendar} label="تقويم الإطلاق" isActive={activeModule === 'calendar'} onClick={() => setActiveModule('calendar')} />
           <CodexSidebarItem icon={DollarSign} label="ميزانية النمو" isActive={activeModule === 'budget'} onClick={() => setActiveModule('budget')} />
           <CodexSidebarItem icon={BarChart3} label="تقارير الأثر" isActive={activeModule === 'reports'} onClick={() => setActiveModule('reports')} />
           <CodexSidebarItem icon={Settings} label="الإعدادات" isActive={activeModule === 'settings'} onClick={() => setActiveModule('settings')} />
        </div>

        <div className="mt-auto">
           <div className="p-5 rounded-2xl bg-gradient-to-br from-[#244F3A]/30 to-transparent border border-[#244F3A]/40 text-center">
              <p className="text-[10px] text-[#A9D3B8] font-bold uppercase tracking-widest mb-1">طيبة الطيبة</p>
              <p className="text-xs text-[#F7F5F0]/60 italic">مركز الإشعاع الحضاري</p>
           </div>
        </div>
      </aside>

      {/* 03. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] relative p-10">
         {/* Background Arch Motif */}
         <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] border border-[#C8A96A]/10 rounded-t-full -z-10 opacity-20 pointer-events-none" />
         
         <div className="max-w-6xl mx-auto space-y-12">
            {/* Header Section */}
            <header className="flex items-start justify-between">
               <div className="flex gap-12">
                  {/* Campaign Arch Image Placeholder */}
                  <div className="w-56 h-80 rounded-t-full border border-[#C8A96A]/30 bg-[#151515] relative overflow-hidden flex items-center justify-center shadow-2xl">
                     <img 
                       src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop" 
                       alt="Madinah" 
                       className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale-[0.2]"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                  </div>
                  
                  <div className="pt-12">
                     <div className="flex items-center gap-6 mb-6">
                        <h1 className="text-6xl font-bold text-[#F7F5F0] tracking-tighter">حملة روح المدينة</h1>
                        <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> LIVE NOW
                        </span>
                     </div>
                     <p className="text-xl text-[#F7F5F0]/50 max-w-2xl leading-relaxed mb-8">
                        إحياء "إرث النبوة" من خلال محتوى بصري فاخر يروي قصة طيبة الطيبة ومنتجاتها المباركة للعالم أجمع.
                     </p>
                     <div className="flex items-center gap-4">
                        <button className="px-8 py-3 rounded-xl bg-[#C8A96A] text-[#0D0D0D] font-bold text-sm hover:scale-105 transition-transform">تعديل الحملة</button>
                        <button className="px-8 py-3 rounded-xl border border-[#C8A96A]/20 text-[#C8A96A] font-bold text-sm hover:bg-[#C8A96A]/5 transition-all">معاينة الأثر</button>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 pt-10">
                  <div className="flex flex-col items-end">
                     <p className="text-[10px] text-[#C8A96A] font-bold tracking-[0.2em]">١٦ ذو القعدة ١٤٤٥ هـ</p>
                     <p className="text-xs text-[#F7F5F0]/40 font-sans uppercase">Madinah, KSA</p>
                  </div>
                  <button className="p-3 rounded-xl border border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A]/10 transition-colors">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </header>

            {/* Campaign Pulse (Metrics Bar) */}
            <div className="grid grid-cols-4 gap-4 p-4 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 backdrop-blur-md">
               <CodexMetricSeal label="الوصول" value="٢.٤٨ مليون" trend="+٢٨٪" icon={Megaphone} />
               <CodexMetricSeal label="التفاعل" value="٣١٨ ألف" trend="+٣٥٪" icon={MessageSquare} />
               <CodexMetricSeal label="التحويل" value="١٢.٦٪" trend="+١٥٪" icon={BarChart3} />
               <CodexMetricSeal label="المبيعات" value="١.٢٧ مليون" trend="+٤٢٪" icon={DollarSign} />
            </div>

            {/* Campaign Journey (Workflow Path) */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-[#F7F5F0] mr-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C8A96A]" /> مسار الحملة
               </h3>
               <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                  <CodexPathStep count={1} label="الفكرة" isCompleted items={[{ title: 'فيديو تعريفي', type: 'idea' }, { title: 'سلسلة تراثية', type: 'idea' }]} />
                  <CodexPathStep count={2} label="المحتوى" isCompleted items={[{ title: 'فيديو الحرمين', status: 'تصوير' }, { title: 'مقالة المدونة', status: 'كتابة' }]} />
                  <CodexPathStep count={3} label="قيد المراجعة" isActive items={[{ title: 'فيلم قصير', status: 'قيد المراجعة' }, { title: 'تصاميم بصرية', status: 'مراجعة التصميم' }]} />
                  <CodexPathStep count={4} label="جاهز للنشر" items={[{ title: 'إعلان ترويجي', status: 'جاهز' }, { title: 'منشور إنستغرام', status: 'جاهز' }]} />
                  <CodexPathStep count={5} label="منشور الآن" items={[{ title: 'فيديو الحملة', status: 'Live' }, { title: 'بوستر أساسي', status: 'Live' }]} />
               </div>
            </div>

            {/* Bottom Section: Timeline & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Launch Timeline */}
               <div className="lg:col-span-2 p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 relative overflow-hidden">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">تقويم الإطلاق</h3>
                  <div className="relative h-24 flex items-center justify-between px-10">
                     <div className="absolute inset-x-0 h-px bg-[#C8A96A]/20" />
                     {[
                       { day: '١٥', label: 'إعلان تشويقي' },
                       { day: '١٨', label: 'فيلم قصير' },
                       { day: '٢٠', label: 'بث مباشر', active: true },
                       { day: '٢٣', label: 'إعلان ممول' },
                       { day: '٢٦', label: 'ختام الحملة' },
                     ].map((node, i) => (
                       <div key={i} className="relative flex flex-col items-center">
                          <div className={cn(
                             "w-4 h-4 rounded-full border-2 transition-all",
                             node.active ? "bg-[#C8A96A] border-[#C8A96A] scale-150 shadow-[0_0_15px_rgba(200,169,106,0.5)]" : "bg-[#0D0D0D] border-[#C8A96A]/40"
                          )} />
                          <div className="absolute top-8 text-center whitespace-nowrap">
                             <p className={cn("text-[10px] font-bold uppercase tracking-widest", node.active ? "text-[#C8A96A]" : "text-[#F7F5F0]/30")}>ذو القعدة {node.day}</p>
                             <p className="text-[11px] text-[#F7F5F0]/80 mt-1">{node.label}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Influencer Pulse */}
               <div className="p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40">
                  <h3 className="text-xl font-bold text-[#F7F5F0] mb-8">المؤثرين النشطين</h3>
                  <div className="space-y-6">
                     {[
                        { name: 'أ. عبدالعزيز', followers: '١.٢ مليون', active: true },
                        { name: 'أ. سارة القحطاني', followers: '٨٧٠ ألف', active: true },
                        { name: 'أ. نورة الدوسري', followers: '٦٢٠ ألف', active: false },
                     ].map((inf, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full border border-[#C8A96A]/20 bg-[#1A1A1A] flex items-center justify-center text-[#C8A96A] font-bold">
                                 {inf.name[0]}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-[#F7F5F0]">{inf.name}</p>
                                 <p className="text-[10px] text-[#F7F5F0]/30">{inf.followers} متابع</p>
                              </div>
                           </div>
                           <div className={cn("w-2 h-2 rounded-full", inf.active ? "bg-green-500 animate-pulse" : "bg-[#F7F5F0]/10")} />
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-8 py-3 rounded-xl border border-[#C8A96A]/10 text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest hover:bg-[#C8A96A]/5 transition-all">عرض الكل</button>
               </div>
            </div>
         </div>
      </main>

      {/* 04. ACTIVITY SIDEBAR (Live Stream) */}
      <aside className="w-80 border-r border-[#C8A96A]/10 bg-[#0A0A0A] flex flex-col z-40">
         <div className="p-6 border-b border-[#C8A96A]/10 flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-widest uppercase text-[#F7F5F0]">النشاط المباشر</h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#244F3A]/30 text-[#A9D3B8] text-[9px] font-bold">
               LIVE <span className="w-1 h-1 rounded-full bg-[#A9D3B8] animate-ping" />
            </span>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {[
               { title: 'تم نشر فيديو الحملة', msg: 'الحملة وصلت لـ ٥٠ ألف مشاهدة في الدقائق الأولى.', time: 'منذ ٢ دقيقة', icon: Play, color: '#C8A96A' },
               { title: 'تعليق جديد من مؤثر', msg: 'أ. عبدالعزيز تفاعل مع الفيديو التعريفي.', time: 'منذ ٥ دقائق', icon: MessageSquare, color: '#A9D3B8' },
               { title: 'زيادة في التفاعل', msg: 'معدل التفاعل ارتفع بنسبة ١٢٪ في الرياض.', time: 'منذ ١٠ دقائق', icon: BarChart3, color: '#244F3A' },
               { title: 'مشاركة جديدة', msg: 'الحملة حصلت على ٥٠٠ مشاركة عضوية.', time: 'منذ ١٥ دقيقة', icon: Share2, color: '#C8A96A' },
            ].map((activity, i) => (
               <div key={i} className="relative pr-6 border-r border-[#C8A96A]/10 pb-8 last:pb-0">
                  <div className="absolute -right-1.5 top-0 w-3 h-3 rounded-full border-2 border-[#0D0D0D]" style={{ backgroundColor: activity.color }} />
                  <div className="flex items-center gap-2 mb-2">
                     <activity.icon className="w-3.5 h-3.5" style={{ color: activity.color }} />
                     <h4 className="text-[11px] font-bold text-[#F7F5F0]">{activity.title}</h4>
                  </div>
                  <p className="text-[10px] text-[#F7F5F0]/40 leading-relaxed mb-1">{activity.msg}</p>
                  <span className="text-[9px] text-[#F7F5F0]/20 font-sans">{activity.time}</span>
               </div>
            ))}
         </div>

         <div className="p-6 border-t border-[#C8A96A]/10">
            <div className="p-4 rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/20">
               <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest">نبض الميزانية</p>
                  <p className="text-sm font-bold text-[#F7F5F0]">٧٨٪</p>
               </div>
               <div className="h-1.5 w-full bg-[#0D0D0D] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8A96A] rounded-full transition-all duration-1000" style={{ width: '78%' }} />
               </div>
            </div>
         </div>
      </aside>

      {/* Global Overlays (Notifications & Search) */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-[100]">
         <button className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40 hover:text-[#C8A96A] transition-all">
            <Search className="w-5 h-5" />
         </button>
         <button className="w-12 h-12 rounded-full bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center text-[#F7F5F0]/40 hover:text-[#C8A96A] transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#C8A96A] rounded-full shadow-[0_0_10px_rgba(200,169,106,0.5)]" />
         </button>
      </div>
    </div>
  );
}
