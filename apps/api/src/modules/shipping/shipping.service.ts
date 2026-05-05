import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentStatus } from '@prisma/client';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async createShipment(data: {
    orderId: string;
    carrier: string;
    shippingCost?: number;
    estimatedDeliveryDate?: string;
  }) {
    // Generate tracking number
    const count = await this.prisma.shipment.count();
    const trackingNumber = `IRTH-SH-${String(count + 1).padStart(6, '0')}`;

    const shipment = await this.prisma.shipment.create({
      data: {
        orderId: data.orderId,
        carrier: data.carrier,
        trackingNumber,
        shippingCost: data.shippingCost || 0,
        estimatedDeliveryDate: data.estimatedDeliveryDate ? new Date(data.estimatedDeliveryDate) : null,
        events: {
          create: { status: 'PENDING', notes: 'Shipment created' },
        },
      },
      include: { events: true },
    });

    // Update order status to SHIPPED
    await this.prisma.order.update({
      where: { id: data.orderId },
      data: { status: 'SHIPPED' },
    });

    return shipment;
  }

  async updateStatus(shipmentId: string, status: ShipmentStatus, location?: string, notes?: string) {
    const shipment = await this.prisma.shipment.findUnique({ where: { id: shipmentId } });
    if (!shipment) throw new NotFoundException('Shipment not found');

    const updateData: any = { status };
    if (status === 'DELIVERED') {
      updateData.actualDeliveryDate = new Date();
      // Update order status
      await this.prisma.order.update({
        where: { id: shipment.orderId },
        data: { status: 'DELIVERED' },
      });
    }

    return this.prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        ...updateData,
        events: { create: { status, location, notes } },
      },
      include: { events: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async findByTracking(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        events: { orderBy: { createdAt: 'desc' } },
        order: { select: { orderNumber: true, customerName: true, status: true } },
      },
    });
    if (!shipment) throw new NotFoundException('Shipment not found');
    return shipment;
  }

  async findByOrder(orderId: string) {
    return this.prisma.shipment.findMany({
      where: { orderId },
      include: { events: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async findAll(page = 1, limit = 20, status?: ShipmentStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};
    const [shipments, total] = await Promise.all([
      this.prisma.shipment.findMany({
        where, skip, take: limit,
        include: { order: { select: { orderNumber: true, customerName: true } }, events: { take: 1, orderBy: { createdAt: 'desc' } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.shipment.count({ where }),
    ]);
    return { data: shipments, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
