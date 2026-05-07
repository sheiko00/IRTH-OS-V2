'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { Campaign, ContentItem, Influencer } from './marketing-dashboard-data';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const Icon = campaign.icon;
  const progress = (campaign.spent / campaign.budget) * 100;

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#C8A96A]/12 bg-[#0D0D0D]/72 p-6 transition duration-500 hover:border-[#C8A96A]/30">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C8A96A]/25 bg-[#C8A96A]/10 text-[#C8A96A]">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0]">{campaign.name}</h3>
            <p className="text-xs text-[#F7F5F0]/40">{campaign.channel}</p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
          campaign.status === 'ACTIVE' ? "bg-[#244F3A]/20 text-[#A9D3B8] border border-[#244F3A]/40" : "bg-[#F7F5F0]/5 text-[#F7F5F0]/40 border border-[#F7F5F0]/10"
        )}>
          {campaign.status}
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-xs">
          <span className="text-[#F7F5F0]/40">الميزانية المستهلكة</span>
          <span className="text-[#C8A96A] font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#F7F5F0]/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#C8A96A] to-[#244F3A] rounded-full transition-all duration-1000" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#F7F5F0]/60">{formatCurrency(campaign.spent)}</span>
          <span className="text-[#F7F5F0]/30">من {formatCurrency(campaign.budget)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#C8A96A]/10">
        <div>
          <p className="text-[10px] text-[#F7F5F0]/30 mb-1">العائد المتوقع</p>
          <p className="text-sm font-bold text-[#A9D3B8]">{formatCurrency(campaign.revenue)}</p>
        </div>
        <div className="text-left">
          <p className="text-[10px] text-[#F7F5F0]/30 mb-1">CTR</p>
          <p className="text-sm font-bold text-[#C8A96A]">{campaign.ctr}%</p>
        </div>
      </div>
    </div>
  );
}

export function PipelineLane({ items, title }: { items: ContentItem[], title: string }) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-[#F7F5F0] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
        {title}
      </h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="p-4 rounded-2xl border border-[#C8A96A]/8 bg-[#151515]/60 hover:border-[#C8A96A]/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#C8A96A]/10 text-[#C8A96A] font-bold uppercase">{item.type}</span>
              <span className="text-[10px] text-[#F7F5F0]/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {item.dueDate}</span>
            </div>
            <p className="text-sm text-[#F7F5F0]/80 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
