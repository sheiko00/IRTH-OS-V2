'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, Settings, LogOut, Menu, X, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/supplier/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/supplier/batches', label: 'Production Batches', icon: Package },
    { href: '/supplier/files', label: 'Documents & Files', icon: FileText },
    { href: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:sticky top-0 left-0 z-50 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href="/supplier/dashboard" className={cn('flex items-center gap-2', !sidebarOpen && 'lg:hidden')}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-500 font-bold">S</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Supplier Portal</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                pathname === item.href 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', pathname === item.href ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-foreground')} />
              <span className={cn('whitespace-nowrap transition-all duration-300', !sidebarOpen && 'lg:opacity-0 lg:w-0 lg:hidden')}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors group">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={cn('whitespace-nowrap transition-all duration-300', !sidebarOpen && 'lg:opacity-0 lg:w-0 lg:hidden')}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Premium Labs Manufacturing</p>
              <p className="text-xs text-emerald-500 font-semibold">Approved Supplier</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
