import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators';
import { PermissionsGuard } from '../../common/guards/permissions.guard';

@Controller('communications')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CommunicationsController {
  constructor(private readonly commsService: CommunicationsService) {}

  @Post('threads')
  @RequirePermissions('comms:create')
  async createThread(@Body() data: any) {
    return this.commsService.createThread(data);
  }

  @Get('threads')
  @RequirePermissions('comms:read')
  async getThreads(@Req() req: any) {
    return this.commsService.getThreads(req.user.sub);
  }

  @Get('threads/:id/messages')
  @RequirePermissions('comms:read')
  async getMessages(@Param('id') id: string, @Req() req: any) {
    return this.commsService.getMessages(id, req.user.sub);
  }

  @Post('threads/:id/messages')
  @RequirePermissions('comms:send')
  async sendMessage(@Param('id') id: string, @Body('content') content: string, @Req() req: any) {
    return this.commsService.sendMessage(id, req.user.sub, content);
  }
}
