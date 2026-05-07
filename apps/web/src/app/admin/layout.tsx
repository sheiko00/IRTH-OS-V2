'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Truck,
  Megaphone, FolderOpen, BarChart3, Settings, Bell, LogOut,
  ChevronRight, BoxIcon, Factory, Menu, X, Layers, MessageCircle, ShoppingBag,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatWidget } from '@/components/communications/ChatWidget';

const navigation = [
  { name: 'لوحة القيادة', href: '/founder', icon: LayoutDashboard },
  { name: 'معمارية النظام', href: '/admin/architecture', icon: GitBranch },
  { name: 'العمليات', href: '/operations-board', icon: Truck },
  { name: 'التسويق', href: '/marketing-board', icon: Megaphone },
  { name: 'المركز المالي', href: '/admin/finance', icon: BoxIcon },
  { name: 'مركز التواصل', href: '/admin/communications', icon: MessageCircle },
  { name: 'الطلبات', href: '/admin/orders', icon: ShoppingBag },
  { name: 'المخزون', href: '/admin/inventory', icon: Layers },
  { name: 'المنتجات', href: '/admin/products', icon: Package },
  { name: 'الموردين', href: '/admin/suppliers', icon: Factory },
  { name: 'الملفات', href: '/admin/files', icon: FolderOpen },
  { name: 'التقارير', href: '/admin/analytics', icon: BarChart3 },
  { name: 'المستخدمين', href: '/admin/users', icon: Users },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex font-serif">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D0D0D]/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 right-0 z-50 flex flex-col border-l border-[#C8A96A]/10 bg-[#151515] transition-all duration-500 shadow-2xl',
        collapsed ? 'w-[80px]' : 'w-72',
        mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
      )}>
        {/* Logo */}
        <div className={cn('flex items-center border-b border-[#C8A96A]/10 h-20 px-6', collapsed ? 'justify-center px-0' : 'gap-4')}>
          {collapsed ? (
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#000] border border-[#C8A96A]/25 shadow-[0_0_12px_rgba(200,169,106,0.15)]">
              <img src="/irth-logo-clean.png" alt="IRTH" className="w-full h-full object-contain p-0.5" />
            </div>
          ) : (
            <div className="animate-fade-in flex-1 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#000] border border-[#C8A96A]/25 shadow-[0_0_16px_rgba(200,169,106,0.15)] flex-shrink-0">
                <img src="/irth-logo-clean.png" alt="IRTH" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wider text-[#C8A96A] font-serif">IRTH OS</h1>
                <p className="text-[10px] text-[#F7F5F0]/50 tracking-widest uppercase mt-0.5">الإدارة العليا</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-full hover:bg-[#C8A96A]/10 transition-colors text-[#F7F5F0]/60 hover:text-[#C8A96A]"
          >
            <ChevronRight className={cn('w-5 h-5 transition-transform duration-500', collapsed && 'rotate-180')} />
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-[#F7F5F0]/60">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300 relative group',
                  isActive
                    ? 'bg-[#C8A96A]/10 text-[#C8A96A] font-bold'
                    : 'text-[#F7F5F0]/60 hover:text-[#C8A96A] hover:bg-[#C8A96A]/5 font-medium',
                  collapsed && 'justify-center px-2',
                )}
                title={collapsed ? item.name : undefined}
              >
                {isActive && !collapsed && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#C8A96A] rounded-l-full shadow-[0_0_10px_rgba(200,169,106,0.5)]"></div>
                )}
                <item.icon className={cn('w-[20px] h-[20px] flex-shrink-0 transition-transform duration-300 group-hover:scale-110', isActive && 'text-[#C8A96A]')} />
                {!collapsed && <span className="tracking-wide">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#C8A96A]/10 p-4">
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-4 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300',
              collapsed && 'justify-center px-2',
            )}
          >
            <LogOut className="w-[20px] h-[20px]" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn('flex-1 flex flex-col transition-all duration-500 relative min-h-screen', collapsed ? 'lg:mr-[80px]' : 'lg:mr-72')}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-20 border-b border-[#C8A96A]/10 bg-[#0D0D0D]/80 backdrop-blur-xl px-6 lg:px-10 gap-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#F7F5F0]/80 hover:text-[#C8A96A]">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1" />
          
          <button className="relative p-2.5 rounded-full hover:bg-[#C8A96A]/10 transition-colors text-[#F7F5F0]/60 hover:text-[#C8A96A]">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-[#C8A96A] rounded-full shadow-[0_0_8px_rgba(200,169,106,0.8)]" />
          </button>
          
          <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center bg-[#151515] text-[#C8A96A] font-bold shadow-inner">
            م
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10 relative z-10">
          <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none z-[-1]"></div>
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
