import { Truck, Clock, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';

export interface Shipment {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  customerName: string;
  destination: string;
  carrier: string;
  status: 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED';
  updatedAt: string;
  location?: string;
}

export interface LogisticsAlert {
  id: string;
  type: 'DELAY' | 'EXCEPTION' | 'EFFICIENCY';
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export const LOGISTICS_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'IRTH-LOG-8822',
    orderNumber: 'ORD-1022',
    customerName: 'سارة العامري',
    destination: 'الرياض، المملكة العربية السعودية',
    carrier: 'بوسطة',
    status: 'IN_TRANSIT',
    updatedAt: 'منذ ١٢ دقيقة',
    location: 'مركز فرز الرياض الرئيسي'
  },
  {
    id: '2',
    trackingNumber: 'IRTH-LOG-8823',
    orderNumber: 'ORD-1025',
    customerName: 'محمد القحطاني',
    destination: 'المدينة المنورة، حي سلطانة',
    carrier: 'أرامكس',
    status: 'PICKED_UP',
    updatedAt: 'منذ ساعة',
    location: 'مستودع إرث الرئيسي'
  },
  {
    id: '3',
    trackingNumber: 'IRTH-LOG-8824',
    orderNumber: 'ORD-1028',
    customerName: 'ليلى عثمان',
    destination: 'دبي، الإمارات العربية المتحدة',
    carrier: 'دي إتش إل',
    status: 'PENDING',
    updatedAt: 'الآن'
  }
];

export const LOGISTICS_ALERTS: LogisticsAlert[] = [
  {
    id: '1',
    type: 'DELAY',
    title: 'تأخر في التوصيل الدولي',
    message: 'شحنات دبي تواجه تأخيراً في التخليص الجمركي (متوقع ٢٤ ساعة).',
    severity: 'medium'
  },
  {
    id: '2',
    type: 'EFFICIENCY',
    title: 'تحسين المسار المقترح',
    message: 'يمكن توفير ١٥٪ من استهلاك الوقود بدمج شحنات شمال الرياض.',
    severity: 'low'
  }
];
