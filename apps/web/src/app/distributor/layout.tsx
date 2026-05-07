'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingCart, Truck,
  Megaphone, FolderOpen, LogOut,
  ChevronRight, BoxIcon, Menu, X, Users, Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatWidget } from '@/components/communications/ChatWidget';

const navigation = [
  { name: 'لوحة التحكم', href: '/distributor/dashboard', icon: LayoutDashboard },
  { name: 'المنتجات والكتالوج', href: '/distributor/catalog', icon: Store },
  { name: 'طلباتي (B2B)', href: '/distributor/orders', icon: ShoppingCart },
  { name: 'المخزون المتوفر', href: '/distributor/inventory', icon: BoxIcon },
  { name: 'تتبع الشحنات', href: '/distributor/shipping', icon: Truck },
  { name: 'المواد التسويقية', href: '/distributor/marketing', icon: Megaphone },
  { name: 'الملفات والوثائق', href: '/distributor/files', icon: FolderOpen },
  { name: 'حسابي', href: '/distributor/profile', icon: Users },
];

export default function DistributorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex font-serif rtl" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 right-0 z-50 flex flex-col border-l border-[#C8A96A]/10 bg-[#151515] transition-all duration-500 shadow-2xl',
        collapsed ? 'w-[80px]' : 'w-72',
        mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
      )}>
        {/* Logo */}
        <div className={cn('flex items-center border-b border-[#C8A96A]/10 h-20 px-6', collapsed ? 'justify-center px-0' : 'gap-4')}>
          <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center flex-shrink-0 bg-[#0D0D0D]">
            <span className="text-[#C8A96A] font-bold text-lg">إ</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in flex-1 text-right">
              <h1 className="text-xl font-bold tracking-wider text-[#C8A96A]">IRTH OS</h1>
              <p className="text-[10px] text-[#F7F5F0]/50 tracking-widest uppercase mt-0.5">بوابة الموزعين</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex text-[#C8A96A]">
            <ChevronRight className={cn('w-5 h-5 transition-transform duration-500', !collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300 relative group',
                  isActive
                    ? 'bg-[#C8A96A]/10 text-[#C8A96A] font-bold'
                    : 'text-[#F7F5F0]/60 hover:text-[#C8A96A] hover:bg-[#C8A96A]/5 font-medium',
                  collapsed && 'justify-center px-2',
                )}
              >
                <item.icon className={cn('w-[20px] h-[20px] flex-shrink-0', isActive && 'text-[#C8A96A]')} />
                {!collapsed && <span className="tracking-wide">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#C8A96A]/10 p-4">
          <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 transition-all">
            <LogOut className="w-[20px] h-[20px]" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn('flex-1 flex flex-col transition-all duration-500 relative min-h-screen', collapsed ? 'lg:mr-[80px]' : 'lg:mr-72')}>
        <header className="sticky top-0 z-30 flex items-center h-20 border-b border-[#C8A96A]/10 bg-[#0D0D0D]/80 backdrop-blur-xl px-6 lg:px-10 gap-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#F7F5F0]/80">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <div className="w-10 h-10 rounded-full border border-[#C8A96A]/30 flex items-center justify-center bg-[#151515] text-[#C8A96A] font-bold">
            م.ع
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 relative z-10">
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
