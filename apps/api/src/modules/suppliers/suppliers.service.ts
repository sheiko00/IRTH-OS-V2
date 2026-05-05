import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 20, status?: SupplierStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [suppliers, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where, skip, take: limit,
        select: { id: true, name: true, email: true, phone: true, company: true, country: true, status: true, createdAt: true,
          _count: { select: { files: true, productionBatches: true, payouts: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.supplier.count({ where }),
    ]);

    return { data: suppliers, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        files: { orderBy: { createdAt: 'desc' } },
        productionBatches: { orderBy: { createdAt: 'desc' }, take: 10 },
        payouts: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    const { password, hashedRefreshToken, ...result } = supplier;
    return result;
  }

  async create(data: { name: string; email: string; password: string; phone?: string; company?: string; country?: string }) {
    const exists = await this.prisma.supplier.findUnique({ where: { email: data.email } });
    if (exists) throw new ConflictException('Supplier email already exists');
    const hashed = await bcrypt.hash(data.password, 12);
    return this.prisma.supplier.create({
      data: { ...data, password: hashed },
      select: { id: true, name: true, email: true, company: true, status: true, createdAt: true },
    });
  }

  async update(id: string, data: Partial<{ name: string; phone: string; company: string; country: string; status: SupplierStatus }>) {
    return this.prisma.supplier.update({ where: { id }, data,
      select: { id: true, name: true, email: true, phone: true, company: true, country: true, status: true },
    });
  }

  async addFile(supplierId: string, data: { name: string; fileUrl: string; fileType: string; fileSize?: number }) {
    return this.prisma.supplierFile.create({
      data: { supplierId, ...data, fileSize: data.fileSize || 0 },
    });
  }

  async getFiles(supplierId: string) {
    return this.prisma.supplierFile.findMany({
      where: { supplierId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteFile(fileId: string) {
    return this.prisma.supplierFile.delete({ where: { id: fileId } });
  }
}
