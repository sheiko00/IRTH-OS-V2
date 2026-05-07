import type { LucideIcon } from 'lucide-react';
import {
  Megaphone,
  Tag,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  History,
  Sparkles,
  Camera,
  Heart
} from 'lucide-react';

export type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DRAFT';
  budget: number;
  spent: number;
  revenue: number;
  impressions: number;
  clicks: number;
  ctr: number;
  icon: LucideIcon;
};

export type ContentItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  dueDate: string;
};

export type Influencer = {
  id: string;
  name: string;
  platform: string;
  followers: string;
  engagement: string;
  status: string;
};

export const marketingCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'إطلاق مجموعة الصيف',
    channel: 'Instagram / Snapchat',
    status: 'ACTIVE',
    budget: 50000,
    spent: 32000,
    revenue: 125000,
    impressions: 850000,
    clicks: 12500,
    ctr: 1.47,
    icon: Sparkles
  },
  {
    id: '2',
    name: 'حملة العيد الكبرى',
    channel: 'Facebook / Google',
    status: 'COMPLETED',
    budget: 75000,
    spent: 74500,
    revenue: 380000,
    impressions: 2400000,
    clicks: 45000,
    ctr: 1.87,
    icon: Megaphone
  }
];

export const contentPipeline: ContentItem[] = [
  { id: '1', title: 'فيديو تشويقي "روح المدينة"', type: 'Video', status: 'PRODUCTION', dueDate: 'اليوم' },
  { id: '2', title: 'مجموعة صور هدايا العود', type: 'Photography', status: 'REVIEW', dueDate: 'غداً' },
  { id: '3', title: 'مقالات مدونة "طيبة"', type: 'Copywriting', status: 'DRAFT', dueDate: '١٢ مايو' }
];

export const influencerList: Influencer[] = [
  { id: '1', name: 'سارة العبدالله', platform: 'Snapchat', followers: '١.٢M', engagement: '٤.٥٪', status: 'SIGNED' },
  { id: '2', name: 'أحمد المدني', platform: 'Instagram', followers: '٤٥٠K', engagement: '٦.٢٪', status: 'NEGOTIATING' }
];
