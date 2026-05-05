import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequirePermission('VIEW_ORDERS')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
    @Query('customerId') customerId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    return this.ordersService.findAll({ page, limit, status, search, customerId, dateFrom, dateTo });
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('VIEW_ORDERS')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermission('CREATE_ORDER')
  create(@Body() data: any, @CurrentUser('sub') userId: string) {
    return this.ordersService.create(data, userId);
  }

  @Patch(':id/status')
  @UseGuards(PermissionsGuard)
  @RequirePermission('MANAGE_ORDER_STATUS')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
    @Body('notes') notes: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.ordersService.updateStatus(id, status, userId, notes);
  }

  @Post(':id/notes')
  @UseGuards(PermissionsGuard)
  @RequirePermission('EDIT_ORDER')
  addNote(
    @Param('id') id: string,
    @Body('content') content: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.ordersService.addNote(id, userId, content);
  }

  @Patch(':id/assign')
  @UseGuards(PermissionsGuard)
  @RequirePermission('MANAGE_ORDER_STATUS')
  assign(@Param('id') id: string, @Body('assignedToId') assignedToId: string) {
    return this.ordersService.assignOrder(id, assignedToId);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('DELETE_ORDER')
  delete(@Param('id') id: string) {
    return this.ordersService.softDelete(id);
  }
}
