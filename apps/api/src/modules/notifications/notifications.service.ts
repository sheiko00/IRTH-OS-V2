import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getUserNotifications(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [notifications, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
    ]);
    return {
      data: notifications,
      unreadCount,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async createNotification(data: {
    userId?: string;
    customerId?: string;
    type: string;
    title: string;
    body: string;
    data?: any;
  }) {
    return this.prisma.notification.create({ data });
  }

  // Convenience methods for common notification types
  async notifyOrderStatus(userId: string, orderNumber: string, status: string) {
    return this.createNotification({
      userId,
      type: 'ORDER_STATUS',
      title: `Order ${orderNumber} updated`,
      body: `Order status changed to ${status}`,
      data: { orderNumber, status },
    });
  }

  async notifyLowStock(userId: string, productName: string, currentStock: number) {
    return this.createNotification({
      userId,
      type: 'STOCK_ALERT',
      title: 'Low Stock Alert',
      body: `${productName} has only ${currentStock} units remaining`,
      data: { productName, currentStock },
    });
  }
}
