import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebSocketsGateway } from './websockets.gateway';
import { WebSocketsService } from './websockets.service';
import { EventsListener } from './events.listener';

@Global()
@Module({
  imports: [JwtModule],
  providers: [WebSocketsGateway, WebSocketsService, EventsListener],
  exports: [WebSocketsService],
})
export class WebSocketsModule {}
