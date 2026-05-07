'use client';

import { useState } from 'react';
import {
  Globe, Smartphone, Shield, Zap, Database,
  ShoppingBag, Package, Megaphone, Truck, Factory,
  DollarSign, MessageCircle, Bell, FolderOpen,
  Crown, Users, BarChart3, Server, Lock,
  HardDrive, Activity, Eye, Radio,
  ArrowRight, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Node Component ──────────────────────────────────────────────────────────
function ArchNode({
  icon: Icon,
  label,
  sublabel,
  color = 'gold',
  size = 'md',
  pulse = false,
  className,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  color?: 'gold' | 'green' | 'blue' | 'red' | 'white';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}) {
  const colors = {
    gold: { border: 'border-[#C8A96A]/40', bg: 'bg-[#C8A96A]/10', icon: 'text-[#C8A96A]', glow: 'shadow-[0_0_20px_rgba(200,169,106,0.15)]' },
    green: { border: 'border-[#244F3A]/60', bg: 'bg-[#244F3A]/20', icon: 'text-[#A9D3B8]', glow: 'shadow-[0_0_20px_rgba(36,79,58,0.2)]' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', icon: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
    red: { border: 'border-red-500/30', bg: 'bg-red-500/10', icon: 'text-red-400', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]' },
    white: { border: 'border-[#F7F5F0]/15', bg: 'bg-[#F7F5F0]/5', icon: 'text-[#F7F5F0]/70', glow: '' },
  };
  const sizes = {
    sm: { wrap: 'p-3', icon: 'w-4 h-4', iconWrap: 'w-8 h-8', text: 'text-[10px]', sub: 'text-[8px]' },
    md: { wrap: 'p-4', icon: 'w-5 h-5', iconWrap: 'w-10 h-10', text: 'text-xs', sub: 'text-[9px]' },
    lg: { wrap: 'p-6', icon: 'w-6 h-6', iconWrap: 'w-12 h-12', text: 'text-sm', sub: 'text-[10px]' },
  };
  const c = colors[color];
  const s = sizes[size];

  return (
    <div className={cn(
      'relative flex flex-col items-center gap-2 rounded-2xl border bg-[#151515] transition-all duration-500 hover:scale-105 cursor-pointer group',
      c.border, c.glow, s.wrap, className
    )}>
      <div className={cn('flex items-center justify-center rounded-xl border', c.border, c.bg, s.iconWrap)}>
        <Icon className={cn(s.icon, c.icon)} />
        {pulse && (
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', color === 'green' ? 'bg-[#A9D3B8]' : 'bg-[#C8A96A]')} />
            <span className={cn('relative inline-flex rounded-full h-2 w-2', color === 'green' ? 'bg-[#A9D3B8]' : 'bg-[#C8A96A]')} />
          </span>
        )}
      </div>
      <p className={cn('font-bold text-[#F7F5F0] text-center leading-tight', s.text)}>{label}</p>
      {sublabel && <p className={cn('text-[#F7F5F0]/40 uppercase tracking-widest text-center', s.sub)}>{sublabel}</p>}
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionLabel({ children, side = 'left' }: { children: string; side?: 'left' | 'right' | 'center' }) {
  return (
    <div className={cn(
      'mb-4 flex items-center gap-2',
      side === 'right' ? 'flex-row-reverse text-right' : side === 'center' ? 'justify-center' : 'text-left'
    )}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
      <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#C8A96A]/70">{children}</p>
    </div>
  );
}

// ─── Connector Lines ─────────────────────────────────────────────────────────
function ConnectorLine({ type }: { type: 'auth' | 'data' | 'realtime' }) {
  return (
    <div className={cn(
      'h-px flex-1 rounded-full',
      type === 'auth' && 'border-t-2 border-dotted border-[#C8A96A]/40',
      type === 'data' && 'border-t-2 border-dashed border-[#A9D3B8]/40',
      type === 'realtime' && 'bg-gradient-to-l from-transparent via-[#C8A96A]/60 to-transparent h-[2px]',
    )} />
  );
}

// ─── Module Pill ─────────────────────────────────────────────────────────────
function ModulePill({ icon: Icon, label, color = 'gold' }: { icon: React.ElementType; label: string; color?: 'gold' | 'green' | 'white' }) {
  const c = {
    gold: 'border-[#C8A96A]/25 text-[#C8A96A] bg-[#C8A96A]/8',
    green: 'border-[#244F3A]/50 text-[#A9D3B8] bg-[#244F3A]/15',
    white: 'border-[#F7F5F0]/10 text-[#F7F5F0]/60 bg-[#F7F5F0]/4',
  }[color];
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border text-[10px] font-bold tracking-wide transition-all hover:scale-105', c)}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{label}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const apiModules = [
    { icon: Shield, label: 'المصادقة', en: 'Auth' },
    { icon: Users, label: 'المستخدمون', en: 'Users/Roles' },
    { icon: ShoppingBag, label: 'الطلبات', en: 'Orders' },
    { icon: Layers, label: 'المخزون', en: 'Inventory' },
    { icon: Package, label: 'المنتجات', en: 'Products' },
    { icon: Megaphone, label: 'التسويق', en: 'Marketing' },
    { icon: Factory, label: 'الموردون', en: 'Suppliers' },
    { icon: Truck, label: 'التوزيع', en: 'Distribution' },
    { icon: Truck, label: 'الشحن', en: 'Shipping' },
    { icon: DollarSign, label: 'المالية', en: 'Finance' },
    { icon: MessageCircle, label: 'التواصل', en: 'Communications' },
    { icon: Bell, label: 'الإشعارات', en: 'Notifications' },
    { icon: FolderOpen, label: 'الملفات', en: 'Files' },
  ];

  const roles = [
    { icon: Crown, label: 'المؤسس', en: 'FOUNDER', color: 'gold' as const },
    { icon: Shield, label: 'المدير العام', en: 'ADMIN', color: 'gold' as const },
    { icon: Megaphone, label: 'فريق التسويق', en: 'MARKETING STAFF', color: 'white' as const },
    { icon: Truck, label: 'فريق العمليات', en: 'OPERATIONS STAFF', color: 'white' as const },
    { icon: DollarSign, label: 'فريق المالية', en: 'FINANCE STAFF', color: 'white' as const },
    { icon: Factory, label: 'المورد', en: 'SUPPLIER', color: 'green' as const },
    { icon: Package, label: 'الموزع', en: 'DISTRIBUTOR', color: 'green' as const },
    { icon: Truck, label: 'شريك الشحن', en: 'SHIPPING PARTNER', color: 'green' as const },
  ];

  const workspaces = [
    { icon: Crown, label: 'لوحة المؤسس', sub: 'مركز القيادة', color: 'gold' as const },
    { icon: Shield, label: 'لوحة الإدارة', sub: 'التحكم والإشراف', color: 'gold' as const },
    { icon: Megaphone, label: 'لوحة التسويق', sub: 'الحملات والمحتوى', color: 'white' as const },
    { icon: Truck, label: 'لوحة العمليات', sub: 'الطلبات والإنتاج', color: 'white' as const },
    { icon: DollarSign, label: 'لوحة المالية', sub: 'التقارير والحسابات', color: 'white' as const },
    { icon: Factory, label: 'بوابة المورد', sub: 'إدارة الطلبات', color: 'green' as const },
    { icon: Package, label: 'بوابة الموزع', sub: 'طلبات الحملة', color: 'green' as const },
    { icon: Truck, label: 'لوحة الشحن', sub: 'تتبع الشحنات', color: 'green' as const },
  ];

  const liveEvents = [
    'order.created', 'order.updated', 'stock.low',
    'campaign.updated', 'shipment.updated', 'message.created', 'notification.created',
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F7F5F0] font-serif rtl relative overflow-x-hidden" dir="rtl">
      {/* Background motif */}
      <div className="absolute inset-0 bg-pattern-islamic opacity-[0.025] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full border border-[#C8A96A]/5 opacity-20 pointer-events-none" />

      <div className="relative z-10 p-8 lg:p-12 space-y-10 max-w-[1800px] mx-auto">

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <header className="flex items-end justify-between border-b border-[#C8A96A]/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold text-[#C8A96A] uppercase tracking-[0.5em]">01</span>
              <div className="w-8 h-px bg-[#C8A96A]/30" />
              <span className="text-[10px] font-bold text-[#C8A96A]/50 uppercase tracking-[0.3em]">System Blueprint</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-[#F7F5F0] leading-tight">
              معمارية النظام
            </h1>
            <p className="text-base text-[#F7F5F0]/40 mt-2 tracking-widest uppercase font-sans">IRTH OS — ARCHITECTURE DIAGRAM</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Legend */}
            <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-8 border-t-2 border-dotted border-[#C8A96A]/60" />
                <span className="text-[#C8A96A]/60">Auth Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 border-t-2 border-dashed border-[#A9D3B8]/60" />
                <span className="text-[#A9D3B8]/60">Data Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96A] to-transparent" />
                <span className="text-[#C8A96A]/60">Realtime Events</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── MAIN ARCHITECTURE GRID ──────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-6">

          {/* ═══ COLUMN 1: Roles & Permissions ═══════════════════════════ */}
          <div className="col-span-2 space-y-3">
            <SectionLabel side="right">طبقة الصلاحيات والأدوار</SectionLabel>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.en}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border bg-[#151515] transition-all duration-300 hover:scale-[1.02] cursor-pointer group',
                    role.color === 'gold' ? 'border-[#C8A96A]/20 hover:border-[#C8A96A]/40' :
                    role.color === 'green' ? 'border-[#244F3A]/40 hover:border-[#244F3A]/70' :
                    'border-[#F7F5F0]/8 hover:border-[#F7F5F0]/20'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    role.color === 'gold' ? 'bg-[#C8A96A]/15 text-[#C8A96A]' :
                    role.color === 'green' ? 'bg-[#244F3A]/25 text-[#A9D3B8]' :
                    'bg-[#F7F5F0]/5 text-[#F7F5F0]/50'
                  )}>
                    <role.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#F7F5F0] leading-tight">{role.label}</p>
                    <p className="text-[8px] text-[#F7F5F0]/30 uppercase tracking-widest">{role.en}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Auth Gates */}
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl border border-[#C8A96A]/25 bg-[#C8A96A]/8 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#C8A96A]" />
                  <div>
                    <p className="text-[10px] font-bold text-[#C8A96A] uppercase tracking-widest">JWT AUTH</p>
                    <p className="text-[8px] text-[#F7F5F0]/40">تأكيد الهوية وتوليد التوكن</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl border border-[#244F3A]/40 bg-[#244F3A]/15">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#A9D3B8]" />
                  <div>
                    <p className="text-[10px] font-bold text-[#A9D3B8] uppercase tracking-widest">RBAC GATE</p>
                    <p className="text-[8px] text-[#F7F5F0]/40">التحقق من الصلاحيات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ COLUMN 2-3: Arrow ════════════════════════════════════════ */}
          <div className="col-span-1 flex flex-col items-center justify-center gap-2 pt-8">
            <div className="flex-1 flex flex-col items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-px h-6 bg-gradient-to-b from-[#C8A96A]/40 to-transparent" />
              ))}
            </div>
            <ArrowRight className="w-5 h-5 text-[#C8A96A]/40 -rotate-180" />
            <p className="text-[7px] text-[#C8A96A]/30 uppercase tracking-widest mt-2" style={{ writingMode: 'vertical-rl' }}>
              بوابة الوصول الآمنة
            </p>
          </div>

          {/* ═══ COLUMNS 3-9: CORE ════════════════════════════════════════ */}
          <div className="col-span-7 space-y-6">

            {/* ── CLIENT LAYER ── */}
            <div>
              <SectionLabel side="center">طبقة العملاء والتطبيقات — FRONTEND CLIENTS</SectionLabel>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { icon: Globe, label: 'تطبيق الويب', sub: 'Web Admin', color: 'gold' as const },
                  { icon: Smartphone, label: 'تطبيق الجوال', sub: 'Mobile App', color: 'white' as const },
                  { icon: Factory, label: 'بوابة المورد', sub: 'Supplier Portal', color: 'green' as const },
                  { icon: Package, label: 'بوابة الموزع', sub: 'Distributor Portal', color: 'green' as const },
                  { icon: Truck, label: 'لوحة الشحن', sub: 'Shipping Dashboard', color: 'white' as const },
                ].map((client) => (
                  <ArchNode key={client.sub} icon={client.icon} label={client.label} sublabel={client.sub} color={client.color} size="sm" />
                ))}
              </div>
            </div>

            {/* ── Connector: Client → API ── */}
            <div className="flex items-center gap-2 px-4">
              <ConnectorLine type="auth" />
              <div className="p-2 rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 flex-shrink-0">
                <Shield className="w-4 h-4 text-[#C8A96A]" />
              </div>
              <p className="text-[8px] text-[#C8A96A]/50 uppercase tracking-widest flex-shrink-0">بوابة الـ API</p>
              <ConnectorLine type="auth" />
            </div>

            {/* ── API GATEWAY LAYER ── */}
            <div className="rounded-[2rem] border border-[#C8A96A]/15 bg-[#151515]/60 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-islamic opacity-[0.03] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#C8A96A]/40 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[9px] text-[#C8A96A] uppercase tracking-[0.4em] font-bold">طبقة واجهة البرمجة للتطبيقات</p>
                    <h3 className="text-lg font-bold text-[#F7F5F0]">API GATEWAY — REST API MODULES</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#244F3A]/50 bg-[#244F3A]/20">
                    <span className="w-2 h-2 rounded-full bg-[#A9D3B8] animate-pulse" />
                    <span className="text-[9px] text-[#A9D3B8] font-bold uppercase">ACTIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2">
                  {apiModules.map((mod) => (
                    <ModulePill key={mod.en} icon={mod.icon} label={mod.label} />
                  ))}
                </div>
              </div>
            </div>

            {/* ── BACKEND CORE ── */}
            <div className="grid grid-cols-3 gap-4">
              {/* NestJS */}
              <div className="col-span-1 p-5 rounded-[1.75rem] border border-[#C8A96A]/20 bg-[#151515] relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-islamic opacity-[0.04] pointer-events-none" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C8A96A]/60 to-transparent rounded-l-full" />
                <div className="relative z-10">
                  <SectionLabel>النواة الخلفية — BACKEND CORE</SectionLabel>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 flex items-center justify-center">
                      <Server className="w-6 h-6 text-[#C8A96A]" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#F7F5F0]">NestJS</p>
                      <p className="text-[9px] text-[#C8A96A]/60 uppercase">Backend Core</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: Lock, label: 'JWT / RBAC', sub: 'الأمن والصلاحيات' },
                      { icon: Zap, label: 'Socket.IO', sub: 'الأحداث الفورية' },
                      { icon: Activity, label: 'Redis', sub: 'الطبقة الفورية' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 p-2 rounded-xl border border-[#C8A96A]/10 bg-[#0D0D0D]/60">
                        <item.icon className="w-3.5 h-3.5 text-[#C8A96A]/60" />
                        <div>
                          <p className="text-[10px] font-bold text-[#F7F5F0]">{item.label}</p>
                          <p className="text-[8px] text-[#F7F5F0]/30">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socket.IO Realtime */}
              <div className="col-span-1 p-5 rounded-[1.75rem] border border-[#244F3A]/40 bg-[#151515] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#244F3A]/80 to-transparent rounded-l-full" />
                <div className="relative z-10">
                  <SectionLabel>الطبقة اللحظية — REALTIME</SectionLabel>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border border-[#244F3A]/50 bg-[#244F3A]/25 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#A9D3B8]" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#F7F5F0]">Socket.IO</p>
                      <p className="text-[9px] text-[#A9D3B8]/60 uppercase">Event Bus</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {liveEvents.slice(0, 4).map((ev) => (
                      <div key={ev} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A9D3B8]/60 animate-pulse" />
                        <p className="text-[9px] font-sans text-[#F7F5F0]/40">{ev}</p>
                      </div>
                    ))}
                    <p className="text-[8px] text-[#A9D3B8]/40 mt-2">+{liveEvents.length - 4} more events</p>
                  </div>
                </div>
              </div>

              {/* Data Layer */}
              <div className="col-span-1 p-5 rounded-[1.75rem] border border-blue-500/20 bg-[#151515] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500/60 to-transparent rounded-l-full" />
                <div className="relative z-10">
                  <SectionLabel>طبقة البيانات — DATA</SectionLabel>
                  <div className="space-y-3">
                    {[
                      { icon: Database, label: 'PostgreSQL', sub: 'قاعدة البيانات', color: 'text-blue-400' },
                      { icon: Activity, label: 'Redis Cache', sub: 'Cache / Pub-Sub', color: 'text-red-400' },
                      { icon: HardDrive, label: 'File Storage', sub: 'ملفات النظام', color: 'text-[#C8A96A]' },
                      { icon: Radio, label: 'Integrations', sub: 'تكامل القنوات', color: 'text-[#A9D3B8]' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl border border-[#F7F5F0]/5 bg-[#0D0D0D]/60">
                        <item.icon className={cn('w-4 h-4 flex-shrink-0', item.color)} />
                        <div>
                          <p className="text-[11px] font-bold text-[#F7F5F0]">{item.label}</p>
                          <p className="text-[8px] text-[#F7F5F0]/30">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── INFRASTRUCTURE ── */}
            <div className="p-4 rounded-2xl border border-[#F7F5F0]/8 bg-[#151515]/40">
              <SectionLabel side="center">البنية التحتية — INFRASTRUCTURE</SectionLabel>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: HardDrive, label: 'نسخ احتياطي', en: 'BACKUP' },
                  { icon: Eye, label: 'مراقبة', en: 'MONITORING' },
                  { icon: Shield, label: 'الأمان', en: 'SECURITY' },
                  { icon: BarChart3, label: 'السجلات', en: 'LOGS' },
                ].map((item) => (
                  <div key={item.en} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[#F7F5F0]/5 bg-[#0D0D0D]/40 text-center hover:border-[#C8A96A]/20 transition-all">
                    <item.icon className="w-5 h-5 text-[#F7F5F0]/30" />
                    <p className="text-[10px] font-bold text-[#F7F5F0]/60">{item.label}</p>
                    <p className="text-[7px] text-[#F7F5F0]/20 uppercase tracking-widest">{item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ COLUMN 11: Arrow ════════════════════════════════════════ */}
          <div className="col-span-1 flex flex-col items-center justify-center gap-2 pt-8">
            <div className="flex-1 flex flex-col items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-px h-6 bg-gradient-to-b from-[#C8A96A]/40 to-transparent" />
              ))}
            </div>
            <ArrowRight className="w-5 h-5 text-[#C8A96A]/40" />
            <p className="text-[7px] text-[#C8A96A]/30 uppercase tracking-widest mt-2" style={{ writingMode: 'vertical-rl' }}>
              مساحات العمل
            </p>
          </div>

          {/* ═══ COLUMN 12: Workspaces ═══════════════════════════════════ */}
          <div className="col-span-2 space-y-3">
            <SectionLabel>مساحات العمل (حسب الدور)</SectionLabel>
            <div className="space-y-2">
              {workspaces.map((ws) => (
                <div
                  key={ws.sub}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border bg-[#151515] transition-all duration-300 hover:scale-[1.02] cursor-pointer',
                    ws.color === 'gold' ? 'border-[#C8A96A]/20 hover:border-[#C8A96A]/40' :
                    ws.color === 'green' ? 'border-[#244F3A]/40 hover:border-[#244F3A]/70' :
                    'border-[#F7F5F0]/8 hover:border-[#F7F5F0]/20'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    ws.color === 'gold' ? 'bg-[#C8A96A]/15 text-[#C8A96A]' :
                    ws.color === 'green' ? 'bg-[#244F3A]/25 text-[#A9D3B8]' :
                    'bg-[#F7F5F0]/5 text-[#F7F5F0]/50'
                  )}>
                    <ws.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#F7F5F0] leading-tight">{ws.label}</p>
                    <p className="text-[8px] text-[#F7F5F0]/30 leading-tight">{ws.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Activity Stream */}
            <div className="mt-4 p-3 rounded-xl border border-[#244F3A]/40 bg-[#244F3A]/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#A9D3B8] animate-ping" />
                <p className="text-[9px] text-[#A9D3B8] font-bold uppercase tracking-widest">بث النشاط المباشر</p>
              </div>
              <div className="space-y-1.5">
                {liveEvents.slice(0, 4).map((ev, i) => (
                  <div key={ev} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#C8A96A]/60" />
                    <p className="text-[8px] font-sans text-[#F7F5F0]/35">{ev}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="p-3 rounded-xl border border-[#F7F5F0]/8 bg-[#151515]/40">
              <p className="text-[8px] text-[#F7F5F0]/30 uppercase tracking-widest mb-2 font-bold">الإشعارات والقنوات</p>
              {['البريد الإلكتروني', 'الرسائل النصية', 'واتساب', 'إشعارات داخلية'].map((ch) => (
                <div key={ch} className="flex items-center gap-2 py-1">
                  <div className="w-1 h-1 rounded-full bg-[#C8A96A]/40" />
                  <p className="text-[9px] text-[#F7F5F0]/40">{ch}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FLOW LEGEND ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-12 border-t border-[#C8A96A]/8 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-16 border-t-2 border-dotted border-[#C8A96A]/50" />
            <p className="text-[9px] text-[#C8A96A]/50 uppercase tracking-widest font-bold">مسار المصادقة — Auth Flow</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 border-t-2 border-dashed border-[#A9D3B8]/50" />
            <p className="text-[9px] text-[#A9D3B8]/50 uppercase tracking-widest font-bold">مسار البيانات — Data Flow</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96A] to-transparent" />
            <p className="text-[9px] text-[#C8A96A]/50 uppercase tracking-widest font-bold">الأحداث الفورية — Realtime Events</p>
          </div>
        </div>
      </div>
    </div>
  );
}
