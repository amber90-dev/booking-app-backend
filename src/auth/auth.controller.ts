
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from '../common/dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) { return this.auth.signup(body.username, body.password, body.email); }

  @Post('login')
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: any) { return this.auth.login(res, body.username, body.password); }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refresh(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const user = req.user as { sub: string; username: string; token: string };
    return this.auth.refresh(res, user.sub, user.username, user.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any, @Res({ passthrough: true }) res: any) { return this.auth.logout(res, req.user.sub); }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) { const { sub, username } = req.user; return { id: sub, username }; }
}
