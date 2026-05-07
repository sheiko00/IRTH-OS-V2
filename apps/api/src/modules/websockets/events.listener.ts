import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketsService } from './websockets.service';

@Injectable()
export class EventsListener {
  constructor(private readonly websocketsService: WebSocketsService) {}

  @OnEvent('order.created')
  handleOrderCreated(order: any) {
    // Notify admins about new orders
    this.websocketsService.emitToAdmin('order.created', {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      total: order.total,
      createdAt: order.createdAt,
    });

    // Notify the specific customer if they are connected (future)
    if (order.customerId) {
      this.websocketsService.emitToUser(order.customerId, 'order.update', {
        id: order.id,
        status: 'PENDING',
        message: 'Your order has been received.',
      });
    }
  }

  @OnEvent('order.updated')
  handleOrderUpdated(order: any) {
    // Notify admins about state changes
    this.websocketsService.emitToAdmin('order.updated', order);

    // Notify the customer
    if (order.customerId) {
      this.websocketsService.emitToUser(order.customerId, 'order.update', {
        id: order.id,
        status: order.status,
        message: `Your order status is now ${order.status}`,
      });
    }
  }
}
