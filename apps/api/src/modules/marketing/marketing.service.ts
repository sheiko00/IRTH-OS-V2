import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignStatus, MarketingChannel, PromoDiscountType } from '@prisma/client';

@Injectable()
export class MarketingService {
  constructor(private prisma: PrismaService) {}

  // ─── CAMPAIGNS ────────────────────────────────
  async findAllCampaigns(page = 1, limit = 20, status?: CampaignStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};
    const [campaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: { select: { name: true } },
          kpi: true,
          _count: { select: { promoCodes: true, influencers: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.campaign.count({ where }),
    ]);
    return { data: campaigns, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async createCampaign(
    data: {
      name: string;
      objective?: string;
      channel: MarketingChannel;
      budget?: number;
      startDate?: string;
      endDate?: string;
    },
    ownerId: string
  ) {
    return this.prisma.campaign.create({
      data: {
        ...data,
        ownerId,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        kpi: { create: {} },
      },
      include: { kpi: true },
    });
  }

  async updateCampaign(
    id: string,
    data: Partial<{
      name: string;
      objective: string;
      budget: number;
      status: CampaignStatus;
      spent: number;
    }>
  ) {
    return this.prisma.campaign.update({ where: { id }, data, include: { kpi: true } });
  }

  async updateKPI(
    campaignId: string,
    data: {
      impressions?: number;
      clicks?: number;
      cpc?: number;
      ctr?: number;
      cpa?: number;
      revenue?: number;
      roas?: number;
    }
  ) {
    return this.prisma.campaignKPI.update({ where: { campaignId }, data });
  }

  // ─── PROMO CODES ──────────────────────────────
  async findAllPromoCodes(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [codes, total] = await Promise.all([
      this.prisma.promoCode.findMany({
        skip,
        take: limit,
        include: { campaign: { select: { name: true } }, _count: { select: { orders: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.promoCode.count(),
    ]);
    return { data: codes, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async createPromoCode(data: {
    code: string;
    discountType: PromoDiscountType;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number;
    usageLimit?: number;
    expiryDate?: string;
    campaignId?: string;
  }) {
    const exists = await this.prisma.promoCode.findUnique({
      where: { code: data.code.toUpperCase() },
    });
    if (exists) throw new ConflictException('Promo code already exists');
    return this.prisma.promoCode.create({
      data: {
        ...data,
        code: data.code.toUpperCase(),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      },
    });
  }

  async validatePromoCode(code: string, orderTotal: number) {
    const promo = await this.prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
    if (!promo) throw new NotFoundException('Promo code not found');
    if (!promo.isActive) throw new BadRequestException('Promo code is inactive');
    if (promo.expiryDate && promo.expiryDate < new Date())
      throw new BadRequestException('Promo code expired');
    if (promo.usageLimit && promo.usageCount >= promo.usageLimit)
      throw new BadRequestException('Promo code usage limit reached');
    if (promo.minOrderValue && orderTotal < promo.minOrderValue)
      throw new BadRequestException(`Minimum order value is ${promo.minOrderValue}`);

    let discount = 0;
    if (promo.discountType === 'PERCENTAGE') {
      discount = orderTotal * (promo.discountValue / 100);
      if (promo.maxDiscount && discount > promo.maxDiscount) discount = promo.maxDiscount;
    } else {
      discount = promo.discountValue;
    }

    return {
      valid: true,
      promoCodeId: promo.id,
      discount,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
    };
  }

  async togglePromoCode(id: string) {
    const promo = await this.prisma.promoCode.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Promo code not found');
    return this.prisma.promoCode.update({ where: { id }, data: { isActive: !promo.isActive } });
  }

  // ─── INFLUENCERS ──────────────────────────────
  async findAllInfluencers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [influencers, total] = await Promise.all([
      this.prisma.influencer.findMany({
        skip,
        take: limit,
        include: { campaign: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.influencer.count(),
    ]);
    return {
      data: influencers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async createInfluencer(data: {
    name: string;
    handle: string;
    platform: string;
    followers?: number;
    email?: string;
    phone?: string;
    campaignId?: string;
    promoCode?: string;
    commission?: number;
  }) {
    return this.prisma.influencer.create({ data });
  }

  async updateInfluencer(
    id: string,
    data: Partial<{
      name: string;
      followers: number;
      revenue: number;
      campaignId: string;
      promoCode: string;
      commission: number;
    }>
  ) {
    return this.prisma.influencer.update({ where: { id }, data });
  }
}
