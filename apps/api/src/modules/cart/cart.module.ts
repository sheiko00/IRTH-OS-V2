import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [JwtModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
