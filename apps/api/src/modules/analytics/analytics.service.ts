import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalOrders,
      monthOrders,
      lastMonthOrders,
      totalRevenue,
      monthRevenue,
      totalCustomers,
      monthCustomers,
      totalProducts,
      activeProducts,
      lowStockCount,
      pendingOrders,
    ] = await Promise.all([
      this.prisma.order.count({ where: { isDeleted: false } }),
      this.prisma.order.count({ where: { isDeleted: false, createdAt: { gte: startOfMonth } } }),
      this.prisma.order.count({
        where: { isDeleted: false, createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
      }),
      this.prisma.order.aggregate({
        where: { isDeleted: false, status: { not: 'CANCELLED' } },
        _sum: { total: true },
      }),
      this.prisma.order.aggregate({
        where: { isDeleted: false, status: { not: 'CANCELLED' }, createdAt: { gte: startOfMonth } },
        _sum: { total: true },
      }),
      this.prisma.customer.count(),
      this.prisma.customer.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.product.count(),
      this.prisma.product.count({ where: { status: 'ACTIVE' } }),
      this.prisma.productVariant.count({ where: { stockQuantity: { lte: 10 } } }),
      this.prisma.order.count({ where: { status: 'PENDING', isDeleted: false } }),
    ]);

    return {
      orders: {
        total: totalOrders,
        thisMonth: monthOrders,
        lastMonth: lastMonthOrders,
        pending: pendingOrders,
      },
      revenue: { total: totalRevenue._sum.total || 0, thisMonth: monthRevenue._sum.total || 0 },
      customers: { total: totalCustomers, newThisMonth: monthCustomers },
      products: { total: totalProducts, active: activeProducts, lowStock: lowStockCount },
    };
  }

  async getSalesData(dateFrom?: string, dateTo?: string) {
    const where: any = { isDeleted: false, status: { not: 'CANCELLED' } };
    if (dateFrom) where.createdAt = { ...where.createdAt, gte: new Date(dateFrom) };
    if (dateTo) where.createdAt = { ...where.createdAt, lte: new Date(dateTo) };

    const orders = await this.prisma.order.findMany({
      where,
      select: { total: true, createdAt: true, status: true },
      orderBy: { createdAt: 'asc' },
    });

    // Group by date
    const dailySales: Record<string, { revenue: number; orders: number }> = {};
    for (const order of orders) {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!dailySales[date]) dailySales[date] = { revenue: 0, orders: 0 };
      dailySales[date].revenue += order.total;
      dailySales[date].orders += 1;
    }

    return Object.entries(dailySales).map(([date, data]) => ({ date, ...data }));
  }

  async getTopProducts(limit = 10) {
    const items = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: limit,
    });

    const productIds = items.map(i => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, coverImageUrl: true, basePrice: true },
    });

    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        totalSold: item._sum.quantity || 0,
        totalRevenue: item._sum.total || 0,
      };
    });
  }

  async getCustomerStats() {
    const [totalCustomers, customersWithOrders] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.order.groupBy({ by: ['customerId'], where: { customerId: { not: null } } }),
    ]);

    return {
      total: totalCustomers,
      withOrders: customersWithOrders.length,
      withoutOrders: totalCustomers - customersWithOrders.length,
    };
  }
}
