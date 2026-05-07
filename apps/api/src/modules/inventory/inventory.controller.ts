import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermissions('VIEW_INVENTORY')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  getOverview(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inventoryService.getOverview(page, limit);
  }

  @Get('alerts')
  getLowStockAlerts() {
    return this.inventoryService.getLowStockAlerts();
  }

  @Get('expiring')
  getExpiringBatches(@Query('days') days?: number) {
    return this.inventoryService.getExpiringBatches(days);
  }

  @Post('batches')
  @RequirePermissions('MANAGE_INVENTORY')
  addBatch(@Body() data: any) {
    return this.inventoryService.addBatch(data);
  }

  @Post('alerts')
  @RequirePermissions('MANAGE_INVENTORY')
  setReorderAlert(@Body() data: { variantId: string; minStock: number }) {
    return this.inventoryService.setReorderAlert(data.variantId, data.minStock);
  }

  @Delete('alerts/:variantId')
  @RequirePermissions('MANAGE_INVENTORY')
  removeReorderAlert(@Param('variantId') variantId: string) {
    return this.inventoryService.removeReorderAlert(variantId);
  }
}
