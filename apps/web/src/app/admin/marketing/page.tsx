'use client';

import { useState } from 'react';
import { Megaphone, Plus, TrendingUp, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { marketingCampaigns, contentPipeline, influencerList } from '@/components/marketing/marketing-dashboard-data';
import { CampaignCard, PipelineLane } from '@/components/marketing/marketing-dashboard-primitives';
import { FounderPanel, MetricSeal } from '@/components/founder/founder-dashboard-primitives';

export default function MarketingPage() {
  const [tab, setTab] = useState<'overview' | 'content' | 'influencers'>('overview');

  return (
    <div className="space-y-8 font-serif animate-fade-in rtl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A96A]/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#F7F5F0] mb-2">مركز التسويق والنمو</h1>
          <p className="text-[#F7F5F0]/60">إدارة الحملات، صناعة المحتوى، وشبكة المؤثرين في مكان واحد.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0D0D0D] rounded-xl bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-[0_0_20px_rgba(200,169,106,0.3)]">
            <Plus className="w-4 h-4" /> إنشاء حملة جديدة
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[#151515] border border-[#C8A96A]/10 rounded-2xl w-fit">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
          { id: 'content', label: 'مسار المحتوى', icon: Sparkles },
          { id: 'influencers', label: 'المؤثرين', icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all',
              tab === t.id 
                ? 'bg-[#C8A96A] text-[#0D0D0D] shadow-lg' 
                : 'text-[#F7F5F0]/40 hover:text-[#C8A96A] hover:bg-[#C8A96A]/5'
            )}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricSeal 
              metric={{ 
                label: 'إجمالي الوصول', 
                value: '٣.٢M', 
                note: 'عدد مرات الظهور عبر كافة المنصات', 
                trend: '+٢٤٪', 
                icon: Megaphone, 
                tone: 'gold' 
              }} 
            />
            <MetricSeal 
              metric={{ 
                label: 'معدل التحويل', 
                value: '٤.٨٪', 
                note: 'متوسط التحويل من النقرات إلى مبيعات', 
                trend: '+١.٢٪', 
                icon: TrendingUp, 
                tone: 'green' 
              }} 
            />
            <MetricSeal 
              metric={{ 
                label: 'ROAS', 
                value: '٥.٤x', 
                note: 'العائد على الإنفاق الإعلاني', 
                trend: 'مستقر', 
                icon: Sparkles, 
                tone: 'warm' 
              }} 
            />
          </div>

          {/* Active Campaigns */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#F7F5F0]">الحملات النشطة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {marketingCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'content' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PipelineLane items={contentPipeline.filter(i => i.status === 'PRODUCTION')} title="قيد التنفيذ" />
          <PipelineLane items={contentPipeline.filter(i => i.status === 'REVIEW')} title="بانتظار المراجعة" />
          <PipelineLane items={contentPipeline.filter(i => i.status === 'DRAFT')} title="مسودات وأفكار" />
        </div>
      )}

      {tab === 'influencers' && (
        <FounderPanel title="شبكة المؤثرين المعتمدة" meta="PARTNERS">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#C8A96A]/10 text-right">
                  <th className="p-6 text-xs font-bold text-[#C8A96A] uppercase tracking-widest">المؤثر</th>
                  <th className="p-6 text-xs font-bold text-[#C8A96A] uppercase tracking-widest">المنصة</th>
                  <th className="p-6 text-xs font-bold text-[#C8A96A] uppercase tracking-widest">المتابعين</th>
                  <th className="p-6 text-xs font-bold text-[#C8A96A] uppercase tracking-widest">التفاعل</th>
                  <th className="p-6 text-xs font-bold text-[#C8A96A] uppercase tracking-widest">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {influencerList.map(influencer => (
                  <tr key={influencer.id} className="border-b border-[#C8A96A]/5 hover:bg-[#C8A96A]/5 transition-all group">
                    <td className="p-6">
                      <p className="text-sm font-bold text-[#F7F5F0]">{influencer.name}</p>
                    </td>
                    <td className="p-6 text-sm text-[#F7F5F0]/60">{influencer.platform}</td>
                    <td className="p-6 text-sm font-sans text-[#F7F5F0]/60 font-bold">{influencer.followers}</td>
                    <td className="p-6 text-sm font-sans text-[#A9D3B8] font-bold">{influencer.engagement}</td>
                    <td className="p-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold",
                        influencer.status === 'SIGNED' ? "bg-[#244F3A]/20 text-[#A9D3B8]" : "bg-[#C8A96A]/10 text-[#C8A96A]"
                      )}>
                        {influencer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FounderPanel>
      )}
    </div>
  );
}
