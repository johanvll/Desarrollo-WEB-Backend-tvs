import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: any, @Req() req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '0.0.0.0';
    const browser = req.headers['user-agent'] || 'desconocido';
    return this.authService.login(body.email, body.password, ip, browser);
  }

  @Post('logout')
  async logout(@Body() body: any, @Req() req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '0.0.0.0';
    const browser = req.headers['user-agent'] || 'desconocido';
    return this.authService.logout(body.email, ip, browser);
  }
}