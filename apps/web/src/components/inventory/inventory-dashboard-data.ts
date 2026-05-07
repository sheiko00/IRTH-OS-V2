import { Package, AlertTriangle, Calendar, TrendingDown, Layers } from 'lucide-react';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  expiryDate?: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRING';
}

export const INVENTORY_DATA: InventoryItem[] = [
  {
    id: '1',
    sku: 'RAD-SER-30ML',
    name: 'سيروم الإشراق (٣٠ مل)',
    category: 'العناية بالبشرة',
    quantity: 100,
    minStock: 20,
    status: 'IN_STOCK'
  },
  {
    id: '2',
    sku: 'HGO-100ML',
    name: 'زيت نمو الشعر (١٠٠ مل)',
    category: 'العناية بالشعر',
    quantity: 3,
    minStock: 10,
    status: 'LOW_STOCK'
  },
  {
    id: '3',
    sku: 'BLL-250ML',
    name: 'لوشن الجسم الفاخر (٢٥٠ مل)',
    category: 'العناية بالجسم',
    quantity: 8,
    minStock: 15,
    status: 'LOW_STOCK'
  },
  {
    id: '4',
    sku: 'VCT-200ML',
    name: 'تونر فيتامين سي (٢٠٠ مل)',
    category: 'العناية بالبشرة',
    quantity: 180,
    minStock: 30,
    status: 'IN_STOCK'
  }
];
