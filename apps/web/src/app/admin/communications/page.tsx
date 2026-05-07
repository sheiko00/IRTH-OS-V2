'use client';

import { useState } from 'react';
import { 
  MessageSquare, Search, Send, User, 
  MoreVertical, Paperclip, Smile, Shield,
  Users, Truck, Package, MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHAT_THREADS } from '@/components/communications/communications-dashboard-data';

export default function CommunicationsPage() {
  const [activeThreadId, setActiveThreadId] = useState('1');
  const [message, setMessage] = useState('');

  const activeThread = CHAT_THREADS.find(t => t.id === activeThreadId) || CHAT_THREADS[0];

  return (
    <div className="h-[calc(100vh-180px)] flex rounded-[2.5rem] border border-[#C8A96A]/15 bg-[#0D0D0D]/72 backdrop-blur-xl overflow-hidden font-serif rtl shadow-[0_30px_100px_rgba(0,0,0,0.5)]" dir="rtl">
      {/* Sidebar: Thread List */}
      <div className="w-[380px] border-l border-[#C8A96A]/10 flex flex-col bg-[#0A0A0A]/40">
        <div className="p-6 border-b border-[#C8A96A]/10">
          <h2 className="text-2xl font-bold text-[#F7F5F0] mb-4">مركز المحادثات</h2>
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F7F5F0]/20 group-focus-within:text-[#C8A96A] transition-colors" />
            <input 
              type="text" 
              placeholder="البحث في المحادثات..."
              className="w-full bg-[#151515] border border-[#C8A96A]/10 rounded-xl py-3 pr-12 pl-4 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A]/30 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CHAT_THREADS.map(thread => (
            <button
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={cn(
                "w-full p-5 flex items-start gap-4 transition-all border-b border-[#C8A96A]/5 hover:bg-[#C8A96A]/5 relative",
                activeThreadId === thread.id ? "bg-[#C8A96A]/10" : ""
              )}
            >
              {activeThreadId === thread.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#C8A96A]" />
              )}
              <div className="relative">
                <div className="w-12 h-12 rounded-full border border-[#C8A96A]/20 bg-[#1A1A1A] flex items-center justify-center text-[#C8A96A]">
                  {thread.type === 'INTERNAL' ? <Users className="w-6 h-6" /> : 
                   thread.type === 'SUPPLIER' ? <Package className="w-6 h-6" /> : 
                   <Truck className="w-6 h-6" />}
                </div>
                <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0D0D0D]" />
              </div>
              <div className="flex-1 text-right overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold text-[#F7F5F0] truncate">{thread.title}</h4>
                  <span className="text-[9px] text-[#F7F5F0]/30 font-sans">{thread.time}</span>
                </div>
                <p className="text-[11px] text-[#F7F5F0]/40 truncate">{thread.lastMessage}</p>
              </div>
              {thread.unreadCount > 0 && (
                <span className="mt-1 w-5 h-5 rounded-full bg-[#C8A96A] text-[#0D0D0D] text-[9px] font-bold flex items-center justify-center">
                  {thread.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0D0D0D]/40">
        {/* Chat Header */}
        <div className="p-6 border-b border-[#C8A96A]/10 flex items-center justify-between bg-[#0A0A0A]/20">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full border border-[#C8A96A]/20 bg-[#1A1A1A] flex items-center justify-center text-[#C8A96A]">
                {activeThread.type === 'INTERNAL' ? <Users className="w-6 h-6" /> : 
                 activeThread.type === 'SUPPLIER' ? <Package className="w-6 h-6" /> : 
                 <Truck className="w-6 h-6" />}
             </div>
             <div>
                <h3 className="text-lg font-bold text-[#F7F5F0]">{activeThread.title}</h3>
                <p className="text-[10px] text-green-500 flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> ACTIVE NOW
                </p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 rounded-lg bg-[#151515] border border-[#C8A96A]/10 text-[#F7F5F0]/40 hover:text-[#C8A96A]">
                <Shield className="w-4 h-4" />
             </button>
             <button className="p-2 rounded-lg bg-[#151515] border border-[#C8A96A]/10 text-[#F7F5F0]/40 hover:text-[#C8A96A]">
                <MoreVertical className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 relative">
           <div className="absolute inset-0 bg-pattern-islamic opacity-[0.02] pointer-events-none" />
           
           <div className="flex flex-col items-center mb-8">
              <span className="px-4 py-1 rounded-full bg-[#151515] border border-[#C8A96A]/10 text-[9px] text-[#C8A96A] font-bold">اليوم</span>
           </div>

           <div className="flex flex-col items-end max-w-[70%] mr-auto">
              <div className="bg-[#151515] border border-[#C8A96A]/10 p-5 rounded-2xl rounded-tr-none shadow-xl">
                 <p className="text-sm text-[#F7F5F0]/80 leading-relaxed">أهلاً بك في نظام تواصل إرث. كيف يمكنني مساعدتك اليوم؟</p>
              </div>
              <span className="text-[9px] text-[#F7F5F0]/20 mt-2 font-sans">٠٩:٠٠ ص</span>
           </div>

           <div className="flex flex-col items-start max-w-[70%] ml-auto">
              <div className="bg-[#C8A96A] p-5 rounded-2xl rounded-tl-none shadow-xl shadow-[#C8A96A]/10">
                 <p className="text-sm text-[#0D0D0D] font-medium leading-relaxed">نحتاج لتأكيد كميات المسك في الدفعة القادمة للمنطقة الغربية.</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                 <span className="text-[9px] text-[#F7F5F0]/20 font-sans">٠٩:١٥ ص</span>
                 <div className="w-3.5 h-3.5 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[7px] text-[#C8A96A]">✓✓</div>
              </div>
           </div>
        </div>

        {/* Chat Input */}
        <div className="p-8 border-t border-[#C8A96A]/10 bg-[#0A0A0A]/40">
           <div className="relative group">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl py-5 pr-14 pl-40 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C8A96A] transition-all shadow-inner"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#F7F5F0]/20">
                 <MessageSquare className="w-5 h-5" />
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                 <button className="p-2 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><Smile className="w-5 h-5" /></button>
                 <button className="p-2 text-[#F7F5F0]/30 hover:text-[#C8A96A] transition-colors"><Paperclip className="w-5 h-5" /></button>
                 <button className="bg-[#C8A96A] text-[#0D0D0D] p-3 rounded-xl hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 rotate-180" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
