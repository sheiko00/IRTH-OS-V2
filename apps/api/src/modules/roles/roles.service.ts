import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { users: { select: { id: true, email: true, name: true } } },
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async create(data: { name: string; displayName: string; permissions: string[] }) {
    const exists = await this.prisma.role.findUnique({ where: { name: data.name } });
    if (exists) throw new ConflictException('Role name already exists');
    return this.prisma.role.create({ data });
  }

  async update(id: string, data: { displayName?: string; permissions?: string[] }) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return this.prisma.role.update({ where: { id }, data });
  }

  async delete(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { _count: { select: { users: true } } },
    });
    if (!role) throw new NotFoundException('Role not found');
    if (role._count.users > 0) {
      throw new ConflictException('Cannot delete role with assigned users');
    }
    return this.prisma.role.delete({ where: { id } });
  }

  // Available permissions list
  getAvailablePermissions() {
    return [
      // Users
      'VIEW_USERS', 'CREATE_USER', 'EDIT_USER', 'DELETE_USER', 'MANAGE_ROLES',
      // Products
      'VIEW_PRODUCTS', 'CREATE_PRODUCT', 'EDIT_PRODUCT', 'DELETE_PRODUCT',
      // Orders
      'VIEW_ORDERS', 'CREATE_ORDER', 'EDIT_ORDER', 'DELETE_ORDER', 'MANAGE_ORDER_STATUS',
      // Suppliers
      'VIEW_SUPPLIERS', 'CREATE_SUPPLIER', 'EDIT_SUPPLIER', 'DELETE_SUPPLIER',
      // Inventory
      'VIEW_INVENTORY', 'MANAGE_INVENTORY',
      // Shipping
      'VIEW_SHIPPING', 'MANAGE_SHIPPING',
      // Marketing
      'VIEW_MARKETING', 'CREATE_CAMPAIGN', 'EDIT_CAMPAIGN', 'MANAGE_COUPONS',
      // Files
      'VIEW_FILES', 'UPLOAD_FILES', 'DELETE_FILES',
      // Analytics
      'VIEW_ANALYTICS',
      // Settings
      'MANAGE_SETTINGS',
      // Wildcard
      '*',
    ];
  }
}
