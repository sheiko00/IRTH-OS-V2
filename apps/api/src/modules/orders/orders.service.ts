import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private eventEmitter: EventEmitter2
  ) {}

  private generateOrderNumber(): string {
    return `IRTH-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
    customerId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const { page = 1, limit = 20, status, search, customerId, dateFrom, dateTo } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = { isDeleted: false };
    if (status) where.status = status;
    if (customerId) where.customerId = customerId;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerPhone: { contains: search } },
      ];
    }
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: { select: { name: true, coverImageUrl: true } },
              variant: { select: { sku: true, name: true } },
            },
          },
          createdBy: { select: { name: true } },
          assignedTo: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true, variant: true } },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          include: { changedBy: { select: { name: true } } },
        },
        orderNotes: {
          orderBy: { createdAt: 'desc' },
          include: { author: { select: { name: true } } },
        },
        shipments: { include: { events: { orderBy: { createdAt: 'desc' } } } },
        createdBy: { select: { name: true } },
        assignedTo: { select: { name: true } },
        promoCode: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(
    data: {
      customerId?: string;
      customerName: string;
      customerPhone?: string;
      customerEmail?: string;
      shippingAddress?: string;
      shippingCity?: string;
      shippingCountry?: string;
      paymentMethod?: string;
      notes?: string;
      promoCodeId?: string;
      items: { productId: string; variantId: string; quantity: number; price: number }[];
    },
    createdById: string
  ) {
    // Generate unique order number using timestamp + random suffix (race-condition free)
    const orderNumber = `IRTH-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Calculate totals
    const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;

    // Validate & apply promo code
    if (data.promoCodeId) {
      const promo = await this.prisma.promoCode.findUnique({ where: { id: data.promoCodeId } });
      if (promo && promo.isActive) {
        if (promo.discountType === 'PERCENTAGE') {
          discount = subtotal * (promo.discountValue / 100);
          if (promo.maxDiscount && discount > promo.maxDiscount) discount = promo.maxDiscount;
        } else {
          discount = promo.discountValue;
        }
        await this.prisma.promoCode.update({
          where: { id: promo.id },
          data: { usageCount: { increment: 1 } },
        });
      }
    }

    const total = subtotal - discount;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingCountry: data.shippingCountry,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        subtotal,
        discount,
        total,
        createdById,
        promoCodeId: data.promoCodeId,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            changedById: createdById,
            notes: 'Order created',
          },
        },
      },
      include: {
        items: { include: { product: true, variant: true } },
        statusHistory: true,
      },
    });

    // Decrement stock
    for (const item of data.items) {
      await this.prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }

    // Emit event for real-time update
    this.eventEmitter.emit('order.created', order);

    // Send confirmation email
    if (data.customerEmail) {
      this.emailService
        .sendOrderConfirmation(data.customerEmail, {
          orderNumber,
          customerName: data.customerName,
          items: order.items.map((i: any) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        })
        .catch(() => {}); // fire & forget
    }

    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus, changedById: string, notes?: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    // Validate status transition
    const validTransitions: Record<string, string[]> = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['PROCESSING', 'CANCELLED'],
      PROCESSING: ['IN_PRODUCTION', 'READY', 'CANCELLED'],
      IN_PRODUCTION: ['READY', 'CANCELLED'],
      READY: ['SHIPPED', 'CANCELLED'],
      SHIPPED: ['DELIVERED', 'RETURNED'],
      DELIVERED: ['RETURNED', 'REFUNDED'],
      RETURNED: ['REFUNDED'],
    };

    const allowed = validTransitions[order.status] || [];
    if (!allowed.includes(status)) {
      throw new BadRequestException(`Cannot transition from ${order.status} to ${status}`);
    }

    // If cancelled or returned, restore stock
    if (['CANCELLED', 'RETURNED'].includes(status)) {
      const items = await this.prisma.orderItem.findMany({ where: { orderId } });
      for (const item of items) {
        await this.prisma.productVariant.update({
          where: { id: item.variantId },
          data: { stockQuantity: { increment: item.quantity } },
        });
      }
    }

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        statusHistory: {
          create: {
            status,
            previousStatus: order.status,
            changedById,
            notes,
          },
        },
      },
      include: {
        statusHistory: { orderBy: { createdAt: 'desc' } },
        items: { include: { product: true } },
      },
    });

    // Emit event for real-time update
    this.eventEmitter.emit('order.updated', updated);

    // Send status update email
    if (order.customerEmail) {
      this.emailService
        .sendOrderStatusUpdate(order.customerEmail, {
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          status,
        })
        .catch(() => {}); // fire & forget
    }

    return updated;
  }

  async addNote(orderId: string, authorId: string, content: string) {
    return this.prisma.orderNote.create({
      data: { orderId, authorId, content },
      include: { author: { select: { name: true } } },
    });
  }

  async assignOrder(orderId: string, assignedToId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { assignedToId },
      include: { assignedTo: { select: { name: true } } },
    });
  }

  async softDelete(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { isDeleted: true },
    });
  }
}
