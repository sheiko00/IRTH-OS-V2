import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { ShipmentStatus } from '@prisma/client';

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  // Public tracking
  @Get('track/:trackingNumber')
  findByTracking(@Param('trackingNumber') trackingNumber: string) {
    return this.shippingService.findByTracking(trackingNumber);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('VIEW_SHIPPING')
  findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: ShipmentStatus) {
    return this.shippingService.findAll(page, limit, status);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('MANAGE_SHIPPING')
  create(@Body() data: any) {
    return this.shippingService.createShipment(data);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('MANAGE_SHIPPING')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: ShipmentStatus,
    @Body('location') location?: string,
    @Body('notes') notes?: string,
  ) {
    return this.shippingService.updateStatus(id, status, location, notes);
  }

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('VIEW_SHIPPING')
  findByOrder(@Param('orderId') orderId: string) {
    return this.shippingService.findByOrder(orderId);
  }

  // Webhook for carrier callbacks
  @Post('webhook')
  handleWebhook(@Body() payload: any) {
    // TODO: Process carrier webhook (Bosta, Aramex)
    console.log('Shipping webhook received:', payload);
    return { received: true };
  }
}
