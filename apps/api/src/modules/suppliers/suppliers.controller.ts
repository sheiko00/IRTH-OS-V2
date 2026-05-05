import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { SupplierStatus } from '@prisma/client';

@Controller('suppliers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  @RequirePermission('VIEW_SUPPLIERS')
  findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('status') status?: SupplierStatus) {
    return this.suppliersService.findAll(page, limit, status);
  }

  @Get(':id')
  @RequirePermission('VIEW_SUPPLIERS')
  findById(@Param('id') id: string) {
    return this.suppliersService.findById(id);
  }

  @Post()
  @RequirePermission('CREATE_SUPPLIER')
  create(@Body() data: any) {
    return this.suppliersService.create(data);
  }

  @Patch(':id')
  @RequirePermission('EDIT_SUPPLIER')
  update(@Param('id') id: string, @Body() data: any) {
    return this.suppliersService.update(id, data);
  }

  @Post(':id/files')
  @RequirePermission('EDIT_SUPPLIER')
  addFile(@Param('id') supplierId: string, @Body() data: { name: string; fileUrl: string; fileType: string; fileSize?: number }) {
    return this.suppliersService.addFile(supplierId, data);
  }

  @Get(':id/files')
  @RequirePermission('VIEW_SUPPLIERS')
  getFiles(@Param('id') supplierId: string) {
    return this.suppliersService.getFiles(supplierId);
  }

  @Delete('files/:fileId')
  @RequirePermission('DELETE_SUPPLIER')
  deleteFile(@Param('fileId') fileId: string) {
    return this.suppliersService.deleteFile(fileId);
  }
}
