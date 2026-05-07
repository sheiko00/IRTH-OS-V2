'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocket } from '@/hooks/use-socket';

interface Message {
  id: string;
  content: string;
  senderName: string;
  isMe: boolean;
  timestamp: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'مرحباً، هل يمكنني مساعدتك في شحنة اليوم؟', senderName: 'الدعم الفني', isMe: false, timestamp: '١٠:٠٠ ص' }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { socket } = useSocket(token || undefined);

  useEffect(() => {
    if (socket) {
      socket.on('new_message', (data: any) => {
        setMessages(prev => [...prev, {
          id: data.message.id,
          content: data.message.content,
          senderName: data.message.sender?.name || 'مستخدم',
          isMe: false,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })
        }]);
      });
    }
    return () => {
      if (socket) socket.off('new_message');
    };
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // In a real app, we would POST to /api/communications/messages
    // For this UI demo, we simulate
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      senderName: 'أنا',
      isMe: true,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full bg-[#C8A96A] text-[#0D0D0D] flex items-center justify-center shadow-[0_0_30px_rgba(200,169,106,0.4)] hover:scale-110 transition-all z-50 animate-bounce-slow"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#244F3A] text-white text-[10px] rounded-full flex items-center justify-center border-2 border-[#0D0D0D]">١</span>
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-8 left-8 w-[380px] bg-[#151515] border border-[#C8A96A]/20 rounded-3xl shadow-2xl z-50 flex flex-col transition-all duration-500 overflow-hidden font-serif",
      isMinimized ? "h-20" : "h-[550px]"
    )} dir="rtl">
      {/* Header */}
      <div className="p-5 border-b border-[#C8A96A]/10 flex items-center justify-between bg-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/40 flex items-center justify-center text-[#C8A96A]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F7F5F0]">مركز التواصل (IRTH)</h4>
            <p className="text-[10px] text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> متصل الآن
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-[#F7F5F0]/40 hover:text-[#C8A96A]">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-[#F7F5F0]/40 hover:text-red-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-pattern-islamic bg-[length:200px] bg-opacity-5">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.isMe ? "mr-auto items-start" : "ml-auto items-end")}>
                <div className={cn(
                  "p-4 rounded-2xl text-xs leading-relaxed shadow-lg",
                  msg.isMe 
                    ? "bg-[#C8A96A] text-[#0D0D0D] rounded-tr-none" 
                    : "bg-[#0D0D0D] text-[#F7F5F0]/80 border border-[#C8A96A]/10 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
                <span className="text-[9px] text-[#F7F5F0]/30 mt-1 font-sans">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-[#C8A96A]/10 bg-[#1A1A1A]">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl py-3 px-5 pr-12 text-xs text-[#F7F5F0] placeholder:text-[#F7F5F0]/20 focus:outline-none focus:border-[#C8A96A] transition-all"
              />
              <button
                onClick={handleSend}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8A96A] hover:scale-110 transition-transform"
              >
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
