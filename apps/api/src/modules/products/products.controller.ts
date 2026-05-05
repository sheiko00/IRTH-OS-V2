import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { ProductStatus } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ─── PUBLIC ───────────────────────────────────
  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: ProductStatus,
    @Query('category') categoryId?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('featured') featured?: boolean,
  ) {
    return this.productsService.findAll({ page, limit, status, categoryId, search, sort, featured });
  }

  @Get('categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // ─── ADMIN ────────────────────────────────────
  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('CREATE_PRODUCT')
  create(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('EDIT_PRODUCT')
  update(@Param('id') id: string, @Body() data: any) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('DELETE_PRODUCT')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  // ─── VARIANTS ─────────────────────────────────
  @Post(':id/variants')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('EDIT_PRODUCT')
  addVariant(@Param('id') productId: string, @Body() data: any) {
    return this.productsService.addVariant(productId, data);
  }

  @Patch('variants/:variantId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('EDIT_PRODUCT')
  updateVariant(@Param('variantId') variantId: string, @Body() data: any) {
    return this.productsService.updateVariant(variantId, data);
  }

  @Delete('variants/:variantId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('DELETE_PRODUCT')
  deleteVariant(@Param('variantId') variantId: string) {
    return this.productsService.deleteVariant(variantId);
  }

  // ─── CATEGORIES ───────────────────────────────
  @Post('categories')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('CREATE_PRODUCT')
  createCategory(@Body() data: any) {
    return this.productsService.createCategory(data);
  }

  @Patch('categories/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('EDIT_PRODUCT')
  updateCategory(@Param('id') id: string, @Body() data: any) {
    return this.productsService.updateCategory(id, data);
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermission('DELETE_PRODUCT')
  deleteCategory(@Param('id') id: string) {
    return this.productsService.deleteCategory(id);
  }
}
