import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getOverview(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [variants, total] = await Promise.all([
      this.prisma.productVariant.findMany({
        skip,
        take: limit,
        include: {
          product: { select: { id: true, name: true, coverImageUrl: true } },
          reorderAlert: true,
          inventoryBatches: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
        orderBy: { stockQuantity: 'asc' },
      }),
      this.prisma.productVariant.count(),
    ]);
    return { data: variants, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getLowStockAlerts() {
    const alerts = await this.prisma.reorderAlert.findMany({
      include: {
        variant: {
          include: { product: { select: { id: true, name: true, coverImageUrl: true } } },
        },
      },
    });

    return alerts.filter(alert => alert.variant.stockQuantity <= alert.minStock);
  }

  async getExpiringBatches(daysAhead = 30) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);

    return this.prisma.inventoryBatch.findMany({
      where: {
        expiryDate: { lte: futureDate, gte: new Date() },
        remaining: { gt: 0 },
      },
      include: {
        variant: { include: { product: { select: { name: true } } } },
      },
      orderBy: { expiryDate: 'asc' },
    });
  }

  async addBatch(data: {
    variantId: string;
    batchNumber: string;
    quantity: number;
    expiryDate?: string;
    costPerUnit?: number;
    notes?: string;
  }) {
    const batch = await this.prisma.inventoryBatch.create({
      data: {
        variantId: data.variantId,
        batchNumber: data.batchNumber,
        quantity: data.quantity,
        remaining: data.quantity,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        costPerUnit: data.costPerUnit,
        notes: data.notes,
      },
    });

    // Update variant stock
    await this.prisma.productVariant.update({
      where: { id: data.variantId },
      data: { stockQuantity: { increment: data.quantity } },
    });

    return batch;
  }

  async setReorderAlert(variantId: string, minStock: number) {
    return this.prisma.reorderAlert.upsert({
      where: { variantId },
      create: { variantId, minStock },
      update: { minStock },
    });
  }

  async removeReorderAlert(variantId: string) {
    return this.prisma.reorderAlert.delete({ where: { variantId } });
  }
}
