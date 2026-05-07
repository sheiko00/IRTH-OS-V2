import { User, MessageSquare, Truck, Package } from 'lucide-react';

export interface ChatThread {
  id: string;
  type: 'INTERNAL' | 'SUPPLIER' | 'ORDER' | 'DISTRIBUTOR';
  title: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  participants: string[];
}

export const CHAT_THREADS: ChatThread[] = [
  {
    id: '1',
    type: 'INTERNAL',
    title: 'فريق العمليات',
    lastMessage: 'هل تم تأكيد شحنة الرياض؟',
    time: '١٠:٣٠ ص',
    unreadCount: 3,
    participants: ['أحمد', 'سارة', 'ليلى']
  },
  {
    id: '2',
    type: 'SUPPLIER',
    title: 'مورد: معمل الإرث',
    lastMessage: 'تم تجهيز الدفعة الجديدة من المسك.',
    time: '٩:١٥ ص',
    unreadCount: 0,
    participants: ['خالد']
  },
  {
    id: '3',
    type: 'ORDER',
    title: 'طلب #ORD-1022 (سارة)',
    lastMessage: 'العميلة تستفسر عن وقت التوصيل.',
    time: 'أمس',
    unreadCount: 1,
    participants: ['الدعم', 'سارة']
  }
];
