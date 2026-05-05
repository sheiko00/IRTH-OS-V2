import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermission('VIEW_ANALYTICS')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('overview')
  getOverview() {
    return this.analyticsService.getOverview();
  }

  @Get('sales')
  getSales(@Query('dateFrom') dateFrom?: string, @Query('dateTo') dateTo?: string) {
    return this.analyticsService.getSalesData(dateFrom, dateTo);
  }

  @Get('products/top')
  getTopProducts(@Query('limit') limit?: number) {
    return this.analyticsService.getTopProducts(limit);
  }

  @Get('customers')
  getCustomerStats() {
    return this.analyticsService.getCustomerStats();
  }
}
