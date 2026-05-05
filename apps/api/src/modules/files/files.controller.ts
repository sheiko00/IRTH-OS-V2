import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AssetType } from '@prisma/client';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequirePermission('VIEW_FILES')
  findAll(
    @Query('page') page?: number, @Query('limit') limit?: number,
    @Query('folderId') folderId?: string, @Query('type') type?: AssetType,
  ) {
    return this.filesService.findAll({ page, limit, folderId, type });
  }

  @Post('upload')
  @UseGuards(PermissionsGuard)
  @RequirePermission('UPLOAD_FILES')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('sub') userId: string,
    @Body('folderId') folderId?: string,
    @Body('tags') tags?: string,
  ) {
    const tagArray = tags ? tags.split(',').map(t => t.trim()) : [];
    return this.filesService.uploadAndCreateAsset(file, userId, folderId, tagArray);
  }

  @Post('upload-url')
  @UseGuards(PermissionsGuard)
  @RequirePermission('UPLOAD_FILES')
  uploadFromUrl(@Body() data: any, @CurrentUser('sub') userId: string) {
    return this.filesService.createAssetFromUrl(data, userId);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('DELETE_FILES')
  delete(@Param('id') id: string) {
    return this.filesService.deleteAsset(id);
  }

  @Get('folders')
  @UseGuards(PermissionsGuard)
  @RequirePermission('VIEW_FILES')
  getFolders(@Query('parentId') parentId?: string) {
    return this.filesService.findAllFolders(parentId);
  }

  @Post('folders')
  @UseGuards(PermissionsGuard)
  @RequirePermission('UPLOAD_FILES')
  createFolder(@Body() data: { name: string; parentId?: string }) {
    return this.filesService.createFolder(data);
  }

  @Delete('folders/:id')
  @UseGuards(PermissionsGuard)
  @RequirePermission('DELETE_FILES')
  deleteFolder(@Param('id') id: string) {
    return this.filesService.deleteFolder(id);
  }
}
