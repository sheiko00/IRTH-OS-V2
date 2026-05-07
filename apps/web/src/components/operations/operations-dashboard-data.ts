import type { LucideIcon } from 'lucide-react';
import {
  ShoppingBag,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  User,
  CreditCard
} from 'lucide-react';

export type OrderStage = {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
  time: string;
};

export type OperationalQueue = {
  title: string;
  items: OrderStage[];
  icon: LucideIcon;
  color: string;
};

export const ordersQueue: OperationalQueue[] = [
  {
    title: 'طلبات جديدة',
    icon: ShoppingBag,
    color: '#C8A96A',
    items: [
      { id: '1', orderNumber: 'IRTH-8821', customerName: 'فهد المطيري', status: 'PENDING', total: 1250, time: 'منذ 5 دقائق' },
      { id: '2', orderNumber: 'IRTH-8822', customerName: 'نورة السعيد', status: 'PENDING', total: 850, time: 'منذ 12 دقيقة' }
    ]
  },
  {
    title: 'قيد التجهيز',
    icon: Package,
    color: '#3b82f6',
    items: [
      { id: '3', orderNumber: 'IRTH-8815', customerName: 'محمد العلي', status: 'PROCESSING', total: 2100, time: 'منذ 40 دقيقة' }
    ]
  },
  {
    title: 'بانتظار الشحن',
    icon: Truck,
    color: '#f59e0b',
    items: [
      { id: '4', orderNumber: 'IRTH-8810', customerName: 'ريم خالد', status: 'READY', total: 550, time: 'منذ ساعة' }
    ]
  }
];

export const inventoryAlerts = [
  { id: '1', item: 'زيت العود المعتق', stock: '٥ قطع', status: 'LOW', action: 'طلب توريد' },
  { id: '2', item: 'علب هدايا فاخرة (كبير)', stock: '٠ قطعة', status: 'OUT', action: 'تحقق من المورد' }
];
