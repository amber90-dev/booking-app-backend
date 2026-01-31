import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.access_token || null, // cookie-based
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreExpiration: false,
    });
  }
  validate(payload: any) {
    return { sub: payload.sub, username: payload.username };
  }
}
