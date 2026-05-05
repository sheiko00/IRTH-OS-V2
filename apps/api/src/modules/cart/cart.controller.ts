import { Controller, Get, Post, Patch, Delete, Param, Body, Headers } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(
    @Headers('x-customer-id') customerId?: string,
    @Headers('x-session-id') sessionId?: string,
  ) {
    return this.cartService.getOrCreateCart(customerId, sessionId);
  }

  @Post('items')
  async addItem(
    @Headers('x-customer-id') customerId: string,
    @Headers('x-session-id') sessionId: string,
    @Body() data: { productId: string; variantId: string; quantity: number },
  ) {
    const cart = await this.cartService.getOrCreateCart(customerId, sessionId);
    return this.cartService.addItem(cart.id, data);
  }

  @Patch('items/:itemId')
  updateQuantity(@Param('itemId') itemId: string, @Body('quantity') quantity: number) {
    return this.cartService.updateItemQuantity(itemId, quantity);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.cartService.removeItem(itemId);
  }

  @Post('merge')
  mergeCart(@Body() data: { sessionId: string; customerId: string }) {
    return this.cartService.mergeGuestCart(data.sessionId, data.customerId);
  }
}
