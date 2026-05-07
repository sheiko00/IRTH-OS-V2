import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Banknote,
  Boxes,
  Crown,
  Megaphone,
  PackageCheck,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';

export type FounderMetric = {
  label: string;
  value: string;
  note: string;
  trend: string;
  icon: LucideIcon;
  tone: 'gold' | 'green' | 'warm';
};

export type FounderStage = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  intensity: number;
};

export type FounderActivity = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: LucideIcon;
  color: string;
};

export type FounderDecision = {
  title: string;
  detail: string;
  action: string;
  tone: 'urgent' | 'gold' | 'green';
};

export const founderMetrics: FounderMetric[] = [
  {
    label: 'إيراد الشهر',
    value: '٢.٤M ج.م',
    note: 'صافي المبيعات قبل المصروفات التشغيلية',
    trend: '+١٨٪ نمو',
    icon: Banknote,
    tone: 'gold',
  },
  {
    label: 'نبض النمو',
    value: '٣٧٪',
    note: 'ارتفاع الطلب على مجموعات الهدايا',
    trend: 'أعلى من الهدف',
    icon: Sparkles,
    tone: 'green',
  },
  {
    label: 'حملات نشطة',
    value: '٤',
    note: 'حملتان في مرحلة التوسع وحملة تحت المراجعة',
    trend: 'ROAS ٥.٢x',
    icon: Megaphone,
    tone: 'warm',
  },
];

export const orderStages: FounderStage[] = [
  { label: 'طلب جديد', value: '١٨', detail: 'تحتاج تأكيد خلال ساعة', icon: ShoppingBag, intensity: 82 },
  { label: 'تجهيز', value: '٣١', detail: 'داخل مستودع المدينة', icon: Boxes, intensity: 68 },
  { label: 'إنتاج', value: '٧', detail: 'دفعات لدى الموردين', icon: PackageCheck, intensity: 46 },
  { label: 'جاهز', value: '١٢', detail: 'ينتظر التسليم للشحن', icon: BadgeCheck, intensity: 58 },
  { label: 'شحن', value: '٢٤', detail: 'قيد الحركة اليوم', icon: Truck, intensity: 74 },
];

export const campaignStages: FounderStage[] = [
  { label: 'فكرة', value: '٦', detail: 'مواسم ومناسبات', icon: ScrollText, intensity: 44 },
  { label: 'تصميم', value: '٩', detail: 'أصول قيد التحضير', icon: Sparkles, intensity: 61 },
  { label: 'مراجعة', value: '٣', detail: 'بانتظار اعتماد المؤسس', icon: Crown, intensity: 52 },
  { label: 'Live', value: '٤', detail: 'إعلانات ومؤثرين', icon: Megaphone, intensity: 88 },
];

export const founderActivities: FounderActivity[] = [
  {
    id: 'act-1',
    title: 'طلب هدية فاخر وصل الآن',
    message: 'عميل VIP أتم طلب مجموعة «روح المدينة» بقيمة ٤,٥٠٠ ج.م.',
    time: 'منذ دقيقتين',
    icon: ShoppingBag,
    color: '#C8A96A',
  },
  {
    id: 'act-2',
    title: 'دفعة المورد دخلت فحص الجودة',
    message: 'دفعة العسل والسدر انتقلت إلى مرحلة التحقق من المستندات.',
    time: 'منذ ١٨ دقيقة',
    icon: ShieldCheck,
    color: '#7FA88B',
  },
  {
    id: 'act-3',
    title: 'حملة المؤثرين تتجاوز الهدف',
    message: 'حملة «هدايا من طيبة» تحقق أداء أعلى من المخطط بنسبة ٢٤٪.',
    time: 'منذ ساعة',
    icon: Users,
    color: '#C8A96A',
  },
];

export const founderDecisions: FounderDecision[] = [
  {
    title: 'اعتماد ميزانية حملة',
    detail: 'حملة «روح المدينة» جاهزة للتوسع لمدة ٧ أيام.',
    action: 'اعتماد التوسع',
    tone: 'gold',
  },
  {
    title: 'مخزون يحتاج تدخل',
    detail: 'علب الهدايا الفاخرة تكفي ٤ أيام فقط بالمعدل الحالي.',
    action: 'فتح أمر توريد',
    tone: 'urgent',
  },
  {
    title: 'مورد جديد بانتظار الموافقة',
    detail: 'ملفات الجودة مكتملة وتحتاج قرار اعتماد نهائي.',
    action: 'مراجعة الملف',
    tone: 'green',
  },
];
