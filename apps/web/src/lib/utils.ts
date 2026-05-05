import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'EGP') {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    CONFIRMED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    PROCESSING: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    IN_PRODUCTION: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    READY: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    SHIPPED: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    DELIVERED: 'bg-green-500/10 text-green-500 border-green-500/20',
    CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',
    RETURNED: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    REFUNDED: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    ACTIVE: 'bg-green-500/10 text-green-500 border-green-500/20',
    DRAFT: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    ARCHIVED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    APPROVED: 'bg-green-500/10 text-green-500 border-green-500/20',
    SUSPENDED: 'bg-red-500/10 text-red-500 border-red-500/20',
    PAUSED: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    COMPLETED: 'bg-green-500/10 text-green-500 border-green-500/20',
    PAID: 'bg-green-500/10 text-green-500 border-green-500/20',
  };
  return colors[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
}

export function generateOrderNumber(): string {
  return `IRTH-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
}
