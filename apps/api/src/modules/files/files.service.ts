import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { AssetType } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}

  // ─── ASSETS ───────────────────────────────────
  async findAll(params: { page?: number; limit?: number; folderId?: string; type?: AssetType }) {
    const { page = 1, limit = 20, folderId, type } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (folderId) where.folderId = folderId;
    if (type) where.type = type;

    const [assets, total] = await Promise.all([
      this.prisma.asset.findMany({
        where, skip, take: limit,
        include: {
          folder: { select: { id: true, name: true } },
          uploadedBy: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.asset.count({ where }),
    ]);
    return { data: assets, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async uploadAndCreateAsset(
    file: Express.Multer.File,
    uploadedById: string,
    folderId?: string,
    tags?: string[],
  ) {
    // Determine asset type from MIME
    let type: AssetType = 'DOCUMENT';
    if (file.mimetype.startsWith('image/')) type = 'IMAGE';
    else if (file.mimetype.startsWith('video/')) type = 'VIDEO';

    // Upload to GCS
    const uploaded = await this.storage.uploadFile(file, `assets/${type.toLowerCase()}`);

    // Save to DB
    return this.prisma.asset.create({
      data: {
        name: file.originalname,
        fileUrl: uploaded.url,
        type,
        mimeType: uploaded.mimeType,
        size: uploaded.size,
        folderId,
        tags: tags || [],
        uploadedById,
      },
      include: { folder: true },
    });
  }

  async createAssetFromUrl(data: {
    name: string; fileUrl: string; type: AssetType;
    mimeType?: string; size?: number; folderId?: string; tags?: string[];
  }, uploadedById: string) {
    return this.prisma.asset.create({
      data: { ...data, uploadedById, tags: data.tags || [], size: data.size || 0 },
      include: { folder: true },
    });
  }

  async deleteAsset(id: string) {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Asset not found');

    // Delete from GCS
    await this.storage.deleteFile(asset.fileUrl);

    return this.prisma.asset.delete({ where: { id } });
  }

  // ─── FOLDERS ──────────────────────────────────
  async findAllFolders(parentId?: string) {
    return this.prisma.assetFolder.findMany({
      where: { parentId: parentId || null },
      include: {
        subFolders: true,
        _count: { select: { assets: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createFolder(data: { name: string; parentId?: string }) {
    const slug = slugify(data.name, { lower: true, strict: true }) + '-' + Date.now();
    return this.prisma.assetFolder.create({
      data: { name: data.name, slug, parentId: data.parentId },
    });
  }

  async deleteFolder(id: string) {
    return this.prisma.assetFolder.delete({ where: { id } });
  }
}
