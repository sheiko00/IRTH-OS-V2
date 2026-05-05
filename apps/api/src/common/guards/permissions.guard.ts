import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.sub) {
      throw new ForbiddenException('Access denied');
    }

    // SUPER_ADMIN bypasses all permission checks
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    // Fetch user's role with permissions
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: { role: true },
    });

    if (!dbUser || !dbUser.role) {
      throw new ForbiddenException('User role not found');
    }

    const userPermissions = dbUser.role.permissions;
    const hasPermission = requiredPermissions.every(
      (perm) => userPermissions.includes(perm) || userPermissions.includes('*'),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Missing permissions: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
