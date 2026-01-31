
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

function fromCookie(req: any) {
  if (req && req.cookies && req.cookies['refresh_token']) return req.cookies['refresh_token'];
  return null;
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({ jwtFromRequest: ExtractJwt.fromExtractors([fromCookie]), secretOrKey: process.env.JWT_REFRESH_SECRET, passReqToCallback: true });
  }
  validate(req: any, payload: any) { const token = req.cookies['refresh_token']; return { sub: payload.sub, username: payload.username, token }; }
}
