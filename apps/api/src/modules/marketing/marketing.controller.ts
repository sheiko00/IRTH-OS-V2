import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CampaignStatus } from '@prisma/client';

@Controller('marketing')
@UseGuards(JwtAuthGuard)
export class MarketingController {
  constructor(private marketingService: MarketingService) {}

  // ─── CAMPAIGNS ────────────────────────────────
  @Get('campaigns')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('VIEW_MARKETING')
  findAllCampaigns(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: CampaignStatus
  ) {
    return this.marketingService.findAllCampaigns(page, limit, status);
  }

  @Post('campaigns')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('CREATE_CAMPAIGN')
  createCampaign(@Body() data: any, @CurrentUser('sub') userId: string) {
    return this.marketingService.createCampaign(data, userId);
  }

  @Patch('campaigns/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('EDIT_CAMPAIGN')
  updateCampaign(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateCampaign(id, data);
  }

  @Patch('campaigns/:id/kpi')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('EDIT_CAMPAIGN')
  updateKPI(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateKPI(id, data);
  }

  // ─── PROMO CODES ──────────────────────────────
  @Get('coupons')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('VIEW_MARKETING')
  findAllCoupons(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.marketingService.findAllPromoCodes(page, limit);
  }

  @Post('coupons')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('MANAGE_COUPONS')
  createCoupon(@Body() data: any) {
    return this.marketingService.createPromoCode(data);
  }

  @Post('coupons/validate')
  validateCoupon(@Body() data: { code: string; orderTotal: number }) {
    return this.marketingService.validatePromoCode(data.code, data.orderTotal);
  }

  @Patch('coupons/:id/toggle')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('MANAGE_COUPONS')
  toggleCoupon(@Param('id') id: string) {
    return this.marketingService.togglePromoCode(id);
  }

  // ─── INFLUENCERS ──────────────────────────────
  @Get('influencers')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('VIEW_MARKETING')
  findAllInfluencers(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.marketingService.findAllInfluencers(page, limit);
  }

  @Post('influencers')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('CREATE_CAMPAIGN')
  createInfluencer(@Body() data: any) {
    return this.marketingService.createInfluencer(data);
  }

  @Patch('influencers/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('EDIT_CAMPAIGN')
  updateInfluencer(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateInfluencer(id, data);
  }
}
