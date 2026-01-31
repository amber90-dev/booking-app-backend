"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
function fromCookie(req) {
    if (req && req.cookies && req.cookies['refresh_token'])
        return req.cookies['refresh_token'];
    return null;
}
let RefreshStrategy = class RefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({ jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([fromCookie]), secretOrKey: process.env.JWT_REFRESH_SECRET, passReqToCallback: true });
    }
    validate(req, payload) { const token = req.cookies['refresh_token']; return { sub: payload.sub, username: payload.username, token }; }
};
exports.RefreshStrategy = RefreshStrategy;
exports.RefreshStrategy = RefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RefreshStrategy);
//# sourceMappingURL=refresh.strategy.js.map