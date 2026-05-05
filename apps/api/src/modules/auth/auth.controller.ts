import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ─── ADMIN ────────────────────────────────────
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post('register')
  async registerAdmin(@Body() dto: RegisterDto) {
    return this.authService.registerAdmin(dto);
  }

  // ─── CUSTOMER ─────────────────────────────────
  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  async loginCustomer(@Body() dto: LoginDto) {
    return this.authService.loginCustomer(dto);
  }

  @Post('customer/register')
  async registerCustomer(@Body() dto: RegisterDto) {
    return this.authService.registerCustomer(dto);
  }

  // ─── SUPPLIER ─────────────────────────────────
  @Post('supplier/login')
  @HttpCode(HttpStatus.OK)
  async loginSupplier(@Body() dto: LoginDto) {
    return this.authService.loginSupplier(dto);
  }

  // ─── REFRESH ──────────────────────────────────
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto);
  }
}
