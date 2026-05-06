import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  // ─── ADMIN AUTH ────────────────────────────────
  async loginAdmin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      role: user.role.name,
      type: 'admin',
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken, 'user');
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
        permissions: user.role.permissions,
      },
    };
  }

  async registerAdmin(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    // Find default role or STAFF
    let role = await this.prisma.role.findFirst({ where: { isDefault: true } });
    if (!role) {
      role = await this.prisma.role.findFirst({ where: { name: 'STAFF' } });
    }
    if (!role) {
      throw new BadRequestException('No default role configured. Please seed the database.');
    }

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        roleId: role.id,
      },
      include: { role: true },
    });

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      role: user.role.name,
      type: 'admin',
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken, 'user');
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
        permissions: user.role.permissions,
      },
    };
  }

  // ─── CUSTOMER AUTH ────────────────────────────
  async loginCustomer(dto: LoginDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });

    if (!customer || !customer.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, customer.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens({
      sub: customer.id,
      email: customer.email,
      type: 'customer',
    });

    await this.updateRefreshToken(customer.id, tokens.refreshToken, 'customer');
    return {
      ...tokens,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
      },
    };
  }

  async registerCustomer(dto: RegisterDto) {
    const exists = await this.prisma.customer.findUnique({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const hashed = await bcrypt.hash(dto.password, 12);
    const customer = await this.prisma.customer.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        phone: dto.phone,
      },
    });

    const tokens = await this.generateTokens({
      sub: customer.id,
      email: customer.email,
      type: 'customer',
    });

    await this.updateRefreshToken(customer.id, tokens.refreshToken, 'customer');

    // Send welcome email
    this.emailService.sendWelcomeEmail(customer.email, customer.name).catch(() => {});

    return {
      ...tokens,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    };
  }

  // ─── SUPPLIER AUTH ────────────────────────────
  async loginSupplier(dto: LoginDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { email: dto.email },
    });

    if (!supplier || supplier.status === 'SUSPENDED') {
      throw new UnauthorizedException('Invalid credentials or account suspended');
    }

    const valid = await bcrypt.compare(dto.password, supplier.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens({
      sub: supplier.id,
      email: supplier.email,
      type: 'supplier',
    });

    await this.updateRefreshToken(supplier.id, tokens.refreshToken, 'supplier');
    return {
      ...tokens,
      supplier: {
        id: supplier.id,
        email: supplier.email,
        name: supplier.name,
        company: supplier.company,
        status: supplier.status,
      },
    };
  }

  // ─── REFRESH TOKEN ────────────────────────────
  async refreshTokens(dto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      let entity: any;
      if (payload.type === 'admin') {
        entity = await this.prisma.user.findUnique({ where: { id: payload.sub }, include: { role: true } });
      } else if (payload.type === 'customer') {
        entity = await this.prisma.customer.findUnique({ where: { id: payload.sub } });
      } else if (payload.type === 'supplier') {
        entity = await this.prisma.supplier.findUnique({ where: { id: payload.sub } });
      }

      if (!entity || !entity.hashedRefreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const valid = await bcrypt.compare(dto.refreshToken, entity.hashedRefreshToken);
      if (!valid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload: any = {
        sub: entity.id,
        email: entity.email,
        type: payload.type,
      };
      if (payload.type === 'admin' && entity.role) {
        newPayload.role = entity.role.name;
      }

      const tokens = await this.generateTokens(newPayload);
      await this.updateRefreshToken(entity.id, tokens.refreshToken, payload.type);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // ─── HELPERS ──────────────────────────────────
  private async generateTokens(payload: Record<string, any>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY') || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY') || '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(id: string, refreshToken: string, type: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    if (type === 'admin') {
      await this.prisma.user.update({ where: { id }, data: { hashedRefreshToken: hashed } });
    } else if (type === 'customer') {
      await this.prisma.customer.update({ where: { id }, data: { hashedRefreshToken: hashed } });
    } else if (type === 'supplier') {
      await this.prisma.supplier.update({ where: { id }, data: { hashedRefreshToken: hashed } });
    }
  }
}
