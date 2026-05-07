import { Injectable } from '@nestjs/common';
import { WebSocketsGateway } from './websockets.gateway';

@Injectable()
export class WebSocketsService {
  constructor(private readonly gateway: WebSocketsGateway) {}

  emitToUser(userId: string, event: string, data: any) {
    this.gateway.server.to(`user:${userId}`).emit(event, data);
  }

  emitToRole(role: string, event: string, data: any) {
    this.gateway.server.to(`role:${role}`).emit(event, data);
  }

  emitToAdmin(event: string, data: any) {
    this.gateway.server.to('admin_room').emit(event, data);
  }

  broadcast(event: string, data: any) {
    this.gateway.server.emit(event, data);
  }
}
