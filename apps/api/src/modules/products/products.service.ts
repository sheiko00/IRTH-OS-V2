import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductStatus } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // ─── PRODUCTS ─────────────────────────────────
  async findAll(params: {
    page?: number;
    limit?: number;
    status?: ProductStatus;
    categoryId?: string;
    search?: string;
    sort?: string;
    featured?: boolean;
  }) {
    const { page = 1, limit = 20, status, categoryId, search, sort, featured } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (featured !== undefined) where.isFeatured = featured;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { basePrice: 'asc' };
    if (sort === 'price_desc') orderBy = { basePrice: 'desc' };
    if (sort === 'name') orderBy = { name: 'asc' };
    if (sort === 'newest') orderBy = { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: { where: { isActive: true }, select: { id: true, sku: true, name: true, price: true, stockQuantity: true, attributes: true, imageUrl: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: { where: { isActive: true } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: {
    name: string;
    nameAr?: string;
    brand?: string;
    categoryId?: string;
    description?: string;
    descriptionAr?: string;
    basePrice: number;
    comparePrice?: number;
    cost?: number;
    currency?: string;
    tags?: string[];
    coverImageUrl?: string;
    galleryUrls?: string[];
    weight?: number;
    isFeatured?: boolean;
  }) {
    let slug = slugify(data.name, { lower: true, strict: true });

    // Ensure unique slug
    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    return this.prisma.product.create({
      data: {
        ...data,
        slug,
        tags: data.tags || [],
        galleryUrls: data.galleryUrls || [],
      },
      include: { category: true, variants: true },
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    nameAr: string;
    brand: string;
    categoryId: string;
    description: string;
    descriptionAr: string;
    status: ProductStatus;
    basePrice: number;
    comparePrice: number;
    cost: number;
    tags: string[];
    coverImageUrl: string;
    galleryUrls: string[];
    weight: number;
    isFeatured: boolean;
  }>) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    // Update slug if name changed
    const updateData: any = { ...data };
    if (data.name && data.name !== product.name) {
      updateData.slug = slugify(data.name, { lower: true, strict: true });
      const existing = await this.prisma.product.findUnique({ where: { slug: updateData.slug } });
      if (existing && existing.id !== id) {
        updateData.slug = `${updateData.slug}-${Date.now()}`;
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true, variants: true },
    });
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.delete({ where: { id } });
  }

  // ─── VARIANTS ─────────────────────────────────
  async addVariant(productId: string, data: {
    sku: string;
    name?: string;
    attributes: Record<string, any>;
    price?: number;
    cost?: number;
    stockQuantity?: number;
    barcode?: string;
    weight?: number;
    imageUrl?: string;
  }) {
    const exists = await this.prisma.productVariant.findUnique({ where: { sku: data.sku } });
    if (exists) throw new ConflictException('SKU already exists');

    return this.prisma.productVariant.create({
      data: { ...data, productId, stockQuantity: data.stockQuantity || 0 },
    });
  }

  async updateVariant(variantId: string, data: Partial<{
    name: string;
    attributes: Record<string, any>;
    price: number;
    cost: number;
    stockQuantity: number;
    barcode: string;
    weight: number;
    imageUrl: string;
    isActive: boolean;
  }>) {
    return this.prisma.productVariant.update({ where: { id: variantId }, data });
  }

  async deleteVariant(variantId: string) {
    return this.prisma.productVariant.delete({ where: { id: variantId } });
  }

  // ─── CATEGORIES ───────────────────────────────
  async findAllCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: { children: true },
          orderBy: { sortOrder: 'asc' },
        },
        _count: { select: { products: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async createCategory(data: { name: string; nameAr?: string; parentId?: string; imageUrl?: string; sortOrder?: number }) {
    const slug = slugify(data.name, { lower: true, strict: true });
    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) throw new ConflictException('Category slug already exists');
    return this.prisma.category.create({ data: { ...data, slug } });
  }

  async updateCategory(id: string, data: Partial<{ name: string; nameAr: string; imageUrl: string; sortOrder: number; parentId: string }>) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
