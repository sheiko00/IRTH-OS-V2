'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowUpLeft, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FounderActivity, FounderDecision, FounderMetric, FounderStage } from './founder-dashboard-data';

export function FounderPanel({
  children,
  className,
  title,
  meta,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  meta?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[2rem] border border-[#C8A96A]/15 bg-[#151515]/88 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl',
        'before:absolute before:inset-0 before:bg-pattern-islamic before:opacity-[0.035] before:content-[""]',
        'after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-l after:from-transparent after:via-[#C8A96A]/55 after:to-transparent after:content-[""]',
        className,
      )}
    >
      {(title || meta) && (
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#C8A96A]/10 px-6 py-5">
          {title && <h2 className="font-serif text-xl font-bold text-[#F7F5F0]">{title}</h2>}
          {meta && <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#C8A96A]/70">{meta}</span>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function LiveBadge({ isConnected }: { isConnected: boolean }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-[11px] tracking-[0.18em] transition-colors',
        isConnected
          ? 'border-[#244F3A]/60 bg-[#244F3A]/20 text-[#A9D3B8]'
          : 'border-[#C8A96A]/25 bg-[#C8A96A]/8 text-[#C8A96A]',
      )}
    >
      <span className="relative flex h-2 w-2">
        {isConnected && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A9D3B8] opacity-75" />}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', isConnected ? 'bg-[#A9D3B8]' : 'bg-[#C8A96A]')} />
      </span>
      {isConnected ? 'LIVE' : 'READY'}
    </div>
  );
}

export function MetricSeal({ metric }: { metric: FounderMetric }) {
  const Icon = metric.icon;
  const toneClass = {
    gold: 'border-[#C8A96A]/25 bg-[#C8A96A]/10 text-[#C8A96A]',
    green: 'border-[#244F3A]/70 bg-[#244F3A]/22 text-[#A9D3B8]',
    warm: 'border-[#F7F5F0]/12 bg-[#F7F5F0]/7 text-[#F7F5F0]',
  }[metric.tone];

  return (
    <div className="group relative min-h-[190px] overflow-hidden rounded-[1.75rem] border border-[#C8A96A]/12 bg-[#0D0D0D]/72 p-6 transition duration-500 hover:border-[#C8A96A]/30 hover:shadow-[0_0_44px_rgba(200,169,106,0.09)]">
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#C8A96A]/7 blur-2xl transition duration-700 group-hover:scale-125" />
      <div className={cn('mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border', toneClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mb-2 font-sans text-xs text-[#F7F5F0]/55">{metric.label}</p>
      <div className="flex items-end justify-between gap-4">
        <p className="font-serif text-3xl font-bold text-[#F7F5F0]">{metric.value}</p>
        <span className="rounded-full border border-[#C8A96A]/18 bg-[#C8A96A]/8 px-3 py-1 font-sans text-[11px] text-[#C8A96A]">
          {metric.trend}
        </span>
      </div>
      <p className="mt-4 max-w-[15rem] text-sm leading-6 text-[#F7F5F0]/58">{metric.note}</p>
    </div>
  );
}

export function FlowLane({ stages, title, icon: Icon }: { stages: FounderStage[]; title: string; icon: LucideIcon }) {
  return (
    <FounderPanel title={title} meta="FLOW">
      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-5">
        {stages.map((stage) => {
          const StageIcon = stage.icon;
          return (
            <div key={stage.label} className="relative min-h-[170px] overflow-hidden rounded-[1.5rem] border border-[#C8A96A]/12 bg-[#0D0D0D]/72 p-4">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/8 text-[#C8A96A]">
                  <StageIcon className="h-4 w-4" />
                </span>
                <Icon className="h-4 w-4 text-[#F7F5F0]/18" />
              </div>
              <p className="font-serif text-lg font-bold text-[#F7F5F0]">{stage.label}</p>
              <p className="mt-2 font-serif text-3xl font-bold text-[#C8A96A]">{stage.value}</p>
              <p className="mt-2 text-xs leading-5 text-[#F7F5F0]/55">{stage.detail}</p>
              <div className="absolute inset-x-4 bottom-4 h-1 rounded-full bg-[#F7F5F0]/8">
                <div className="h-full rounded-full bg-gradient-to-l from-[#C8A96A] to-[#244F3A]" style={{ width: `${stage.intensity}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </FounderPanel>
  );
}

export function ActivityStream({ activities }: { activities: FounderActivity[] }) {
  return (
    <FounderPanel title="النشاط المباشر" meta="LIVE FEED" className="h-full">
      <div className="relative space-y-7 p-6">
        <div className="absolute bottom-8 right-[2.15rem] top-8 w-px bg-gradient-to-b from-[#C8A96A]/45 via-[#C8A96A]/12 to-transparent" />
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <article key={activity.id} className="relative z-10 flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-[#151515] shadow-[0_0_22px_rgba(200,169,106,0.10)]" style={{ borderColor: `${activity.color}55` }}>
                <Icon className="h-5 w-5" style={{ color: activity.color }} />
              </div>
              <div className="min-w-0 flex-1 rounded-[1.25rem] border border-[#C8A96A]/8 bg-[#0D0D0D]/62 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-[#F7F5F0]">{activity.title}</h3>
                  <span className="inline-flex items-center gap-1 font-sans text-[11px] text-[#F7F5F0]/38">
                    <Clock3 className="h-3 w-3" />
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm leading-6 text-[#F7F5F0]/62">{activity.message}</p>
              </div>
            </article>
          );
        })}
      </div>
    </FounderPanel>
  );
}

export function DecisionRail({ decisions }: { decisions: FounderDecision[] }) {
  return (
    <FounderPanel title="قرارات المؤسس" meta="ACTION">
      <div className="space-y-3 p-5">
        {decisions.map((decision) => (
          <div
            key={decision.title}
            className={cn(
              'rounded-[1.35rem] border bg-[#0D0D0D]/66 p-4 transition duration-500 hover:-translate-y-0.5',
              decision.tone === 'urgent' && 'border-[#7f1d1d]/45 shadow-[inset_3px_0_0_rgba(127,29,29,0.85)]',
              decision.tone === 'gold' && 'border-[#C8A96A]/22 shadow-[inset_3px_0_0_rgba(200,169,106,0.70)]',
              decision.tone === 'green' && 'border-[#244F3A]/60 shadow-[inset_3px_0_0_rgba(36,79,58,0.95)]',
            )}
          >
            <h3 className="font-serif text-base font-bold text-[#F7F5F0]">{decision.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#F7F5F0]/58">{decision.detail}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/35 px-4 py-2 font-sans text-xs text-[#C8A96A] transition hover:bg-[#C8A96A]/10 hover:shadow-[0_0_22px_rgba(200,169,106,0.13)]">
              {decision.action}
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </FounderPanel>
  );
}
