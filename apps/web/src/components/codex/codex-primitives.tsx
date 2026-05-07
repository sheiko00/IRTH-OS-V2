'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * CodexArch: The primary arched container used for section framing.
 * Matches the "Arched Workflow Chamber" in the design spec.
 */
export function CodexArch({ 
  children, 
  title, 
  subtitle, 
  className,
  headerContent 
}: { 
  children: ReactNode; 
  title?: string; 
  subtitle?: string; 
  className?: string;
  headerContent?: ReactNode;
}) {
  return (
    <div className={cn("relative rounded-[3rem] border border-[#C8A96A]/20 bg-[#0D0D0D]/80 backdrop-blur-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]", className)}>
      {/* Prophetic Heritage Pattern Overlay */}
      <div className="absolute inset-0 bg-pattern-islamic opacity-[0.06] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D] via-transparent to-transparent opacity-40 pointer-events-none" />
      
      {/* Top Gold Horizon */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96A]/60 to-transparent shadow-[0_0_15px_rgba(200,169,106,0.3)]" />
      
      {(title || headerContent) && (
        <div className="relative z-10 px-10 py-8 flex items-center justify-between border-b border-[#C8A96A]/10">
          <div className="flex items-center gap-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-[#C8A96A] to-transparent rounded-full" />
            <div>
              {title && <h3 className="font-serif text-2xl font-bold text-[#F7F5F0] tracking-wide drop-shadow-lg">{title}</h3>}
              {subtitle && <p className="text-[10px] text-[#C8A96A] uppercase tracking-[0.3em] mt-1.5 font-bold">{subtitle}</p>}
            </div>
          </div>
          {headerContent}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * CodexMetricSeal: A circular or arched metric component.
 */
export function CodexMetricSeal({ 
  label, 
  value, 
  trend, 
  trendType = 'up',
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  trend?: string; 
  trendType?: 'up' | 'down';
  icon?: any;
}) {
  return (
    <div className="group relative flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      
      {Icon && (
        <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] mb-4 shadow-[0_0_20px_rgba(200,169,106,0.1)]">
          <Icon className="w-6 h-6" />
        </div>
      )}
      
      <div className="relative">
        <h4 className="text-3xl font-bold text-[#F7F5F0] font-sans tracking-tight">{value}</h4>
        {trend && (
          <span className={cn(
            "absolute -top-1 -right-8 text-[9px] font-bold px-1.5 py-0.5 rounded-md",
            trendType === 'up' ? "text-[#A9D3B8] bg-[#244F3A]/20" : "text-red-500 bg-red-500/10"
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] text-[#F7F5F0]/40 font-serif uppercase tracking-[0.15em] mt-2">{label}</p>
    </div>
  );
}

/**
 * CodexPathStep: An individual step in an arched workflow path.
 */
export function CodexPathStep({ 
  label, 
  count, 
  isActive, 
  isCompleted,
  items = []
}: { 
  label: string; 
  count: number; 
  isActive?: boolean; 
  isCompleted?: boolean;
  items?: { title: string; status?: string; type?: string }[];
}) {
  return (
    <div className={cn(
      "relative flex-1 min-w-[140px] flex flex-col items-center pt-8 pb-4 px-2 transition-all duration-500",
      isActive ? "opacity-100" : "opacity-40 grayscale-[0.5]"
    )}>
      {/* Arch Frame */}
      <div className={cn(
        "absolute inset-x-2 top-0 h-full rounded-t-[3rem] border-x border-t border-[#C8A96A]/20 bg-gradient-to-b from-[#C8A96A]/5 to-transparent",
        isActive && "border-[#C8A96A]/40 bg-[#C8A96A]/5"
      )} />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mb-3 transition-colors",
          isCompleted ? "bg-[#C8A96A] text-[#0D0D0D] border-[#C8A96A]" : 
          isActive ? "bg-transparent text-[#C8A96A] border-[#C8A96A]" : "text-[#F7F5F0]/30 border-[#F7F5F0]/10"
        )}>
          {count}
        </div>
        <h5 className="text-[11px] font-bold text-[#F7F5F0] tracking-wide mb-6">{label}</h5>
        
        <div className="w-full space-y-2 px-2">
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#151515]/80 border border-[#C8A96A]/10 text-right group/item hover:border-[#C8A96A]/30 transition-all">
               <p className="text-[10px] text-[#F7F5F0]/80 leading-relaxed font-medium">{item.title}</p>
               {item.status && <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest">{item.status}</span>
               </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CodexSidebarItem: Sidebar navigation item in Codex style.
 */
export function CodexSidebarItem({ 
  icon: Icon, 
  label, 
  href, 
  isActive, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  href?: string; 
  isActive?: boolean; 
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative",
        isActive 
          ? "bg-[#C8A96A]/10 text-[#C8A96A] shadow-[inset_0_0_15px_rgba(200,169,106,0.05)]" 
          : "text-[#F7F5F0]/40 hover:text-[#F7F5F0]/80 hover:bg-[#F7F5F0]/5"
      )}
    >
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C8A96A] rounded-l-full shadow-[0_0_10px_rgba(200,169,106,0.5)]" />
      )}
      <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-[#C8A96A]")} />
      <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}
