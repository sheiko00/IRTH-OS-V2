import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(customerId?: string, sessionId?: string) {
    let cart = customerId
      ? await this.prisma.cart.findUnique({ where: { customerId }, include: { items: { include: { product: true, variant: true } } } })
      : sessionId
        ? await this.prisma.cart.findUnique({ where: { sessionId }, include: { items: { include: { product: true, variant: true } } } })
        : null;

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { customerId, sessionId },
        include: { items: { include: { product: true, variant: true } } },
      });
    }

    return cart;
  }

  async addItem(cartId: string, data: { productId: string; variantId: string; quantity: number }) {
    // Check if item already exists in cart
    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId, variantId: data.variantId } },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + data.quantity },
        include: { product: true, variant: true },
      });
    }

    return this.prisma.cartItem.create({
      data: { cartId, ...data },
      include: { product: true, variant: true },
    });
  }

  async updateItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.prisma.cartItem.delete({ where: { id: itemId } });
    }
    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true, variant: true },
    });
  }

  async removeItem(itemId: string) {
    return this.prisma.cartItem.delete({ where: { id: itemId } });
  }

  async clearCart(cartId: string) {
    return this.prisma.cartItem.deleteMany({ where: { cartId } });
  }

  async mergeGuestCart(sessionId: string, customerId: string) {
    const guestCart = await this.prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });
    if (!guestCart) return;

    let customerCart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!customerCart) {
      // Transfer guest cart to customer
      await this.prisma.cart.update({
        where: { id: guestCart.id },
        data: { customerId, sessionId: null },
      });
      return;
    }

    // Merge items
    for (const item of guestCart.items) {
      const existing = await this.prisma.cartItem.findUnique({
        where: { cartId_variantId: { cartId: customerCart.id, variantId: item.variantId } },
      });
      if (existing) {
        await this.prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + item.quantity },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cartId: customerCart.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        });
      }
    }

    // Delete guest cart
    await this.prisma.cart.delete({ where: { id: guestCart.id } });
  }
}
