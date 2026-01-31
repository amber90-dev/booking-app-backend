
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

const RT_COOKIE = 'refresh_token';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private users: UsersService) {}

  private signAccess(userId: string, username: string) {
    return this.jwt.signAsync({ sub: userId, username }, { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: process.env.JWT_ACCESS_TTL || '900s' });
  }
  private signRefresh(userId: string, username: string) {
    return this.jwt.signAsync({ sub: userId, username }, { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: process.env.JWT_REFRESH_TTL || '7d' });
  }

  async signup(username: string, password: string, email?: string) {
    const existing = await this.users.findByUsername(username);
    if (existing) throw new BadRequestException('username taken');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.users.create({ username, email, passwordHash, role: 'superadmin' });
    return { id: user.id, username: user.username };
  }

  async validateUser(username: string, password: string) {
    const user = await this.users.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(res: any, username: string, password: string) {
    const user = await this.validateUser(username, password);
    const [access, refresh] = await Promise.all([ this.signAccess(user.id, user.username), this.signRefresh(user.id, user.username) ]);
    await this.users.setRefreshTokenHash(user.id, await bcrypt.hash(refresh, 12));
    res.cookie(RT_COOKIE, refresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7*24*60*60*1000, path: '/auth' });
    return { accessToken: access, user: { id: user.id, username: user.username } };
  }

  async logout(res: any, userId: string) {
    await this.users.setRefreshTokenHash(userId, null);
    res.clearCookie(RT_COOKIE, { path: '/auth' });
    return { success: true };
  }

  async refresh(res: any, userId: string, username: string, refreshToken: string) {
    const user = await this.users.findById(userId);
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException();
    const match = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!match) throw new UnauthorizedException();
    const access = await this.signAccess(userId, username);
    const newRefresh = await this.signRefresh(userId, username);
    await this.users.setRefreshTokenHash(userId, await bcrypt.hash(newRefresh, 12));
    res.cookie(RT_COOKIE, newRefresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7*24*60*60*1000, path: '/auth' });
    return { accessToken: access, user: { id: userId, username } };
  }
}
