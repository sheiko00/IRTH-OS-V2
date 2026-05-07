'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, Settings, LogOut, Menu, X, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatWidget } from '@/components/communications/ChatWidget';

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/supplier/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { href: '/supplier/batches', label: 'دفعات الإنتاج', icon: Package },
    { href: '/supplier/files', label: 'المستندات والملفات', icon: FileText },
    { href: '/supplier/settings', label: 'الإعدادات', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex font-serif">
      {/* Sidebar Overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:sticky top-0 right-0 z-50 h-screen bg-[#151515] border-l border-[#C8A96A]/10 transition-all duration-500 flex flex-col shadow-2xl',
        sidebarOpen ? 'w-72 translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-20'
      )}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#C8A96A]/10">
          <Link href="/supplier/dashboard" className={cn('flex items-center gap-4', !sidebarOpen && 'lg:hidden')}>
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#C8A96A]/30 flex items-center justify-center shadow-inner">
              <span className="text-[#C8A96A] font-bold">M</span>
            </div>
            <span className="font-bold text-lg tracking-widest text-[#C8A96A]">بوابة الموردين</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-[#F7F5F0]/60 hover:text-[#C8A96A]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative',
                pathname === item.href 
                  ? 'bg-[#C8A96A]/10 text-[#C8A96A] font-bold' 
                  : 'text-[#F7F5F0]/60 hover:bg-[#C8A96A]/5 hover:text-[#C8A96A]'
              )}
            >
              {pathname === item.href && sidebarOpen && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#C8A96A] rounded-l-full shadow-[0_0_10px_rgba(200,169,106,0.5)]"></div>
              )}
              <item.icon className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110', pathname === item.href ? 'text-[#C8A96A]' : 'text-[#F7F5F0]/60 group-hover:text-[#C8A96A]')} />
              <span className={cn('tracking-wide transition-all duration-300', !sidebarOpen && 'lg:opacity-0 lg:w-0 lg:hidden')}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#C8A96A]/10">
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400/70 hover:bg-red-400/10 hover:text-red-400 transition-colors duration-300 group">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={cn('tracking-wide transition-all duration-300', !sidebarOpen && 'lg:opacity-0 lg:w-0 lg:hidden')}>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 sticky top-0 z-30 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#C8A96A]/10 px-6 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <p className="text-base font-bold text-[#F7F5F0] tracking-wide">مصنع العطور الفاخرة</p>
              <p className="text-xs text-[#C8A96A] font-sans tracking-widest uppercase mt-0.5">Approved Supplier</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2.5 rounded-full text-[#F7F5F0]/60 hover:text-[#C8A96A] hover:bg-[#C8A96A]/10 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#C8A96A] rounded-full shadow-[0_0_8px_rgba(200,169,106,0.8)]" />
            </button>
            <div className="h-8 w-px bg-[#C8A96A]/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#151515] border border-[#C8A96A]/30 flex items-center justify-center shadow-inner">
                <User className="w-5 h-5 text-[#C8A96A]" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-x-hidden relative z-10">
          <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none z-[-1]"></div>
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
