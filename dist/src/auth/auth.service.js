"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
const RT_COOKIE = 'refresh_token';
let AuthService = class AuthService {
    constructor(jwt, users) {
        this.jwt = jwt;
        this.users = users;
    }
    signAccess(userId, username) {
        return this.jwt.signAsync({ sub: userId, username }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: process.env.JWT_ACCESS_TTL || '900s' });
    }
    signRefresh(userId, username) {
        return this.jwt.signAsync({ sub: userId, username }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_TTL || '7d' });
    }
    async signup(username, password, email) {
        const existing = await this.users.findByUsername(username);
        if (existing)
            throw new common_1.BadRequestException('username taken');
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await this.users.create({ username, email, passwordHash, role: 'superadmin' });
        return { id: user.id, username: user.username };
    }
    async validateUser(username, password) {
        const user = await this.users.findByUsername(username);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return user;
    }
    async login(res, username, password) {
        const user = await this.validateUser(username, password);
        const [access, refresh] = await Promise.all([this.signAccess(user.id, user.username), this.signRefresh(user.id, user.username)]);
        await this.users.setRefreshTokenHash(user.id, await bcrypt.hash(refresh, 12));
        // Cookie Options
        const isProd = process.env.NODE_ENV === 'production';
        const cookieOpts = {
            httpOnly: true,
            sameSite: isProd ? 'none' : 'lax',
            secure: isProd, // Required for SameSite=None
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        };
        res.cookie(RT_COOKIE, refresh, cookieOpts);
        return { accessToken: access, user: { id: user.id, username: user.username } };
    }
    async logout(res, userId) {
        await this.users.setRefreshTokenHash(userId, null);
        res.clearCookie(RT_COOKIE, { path: '/' });
        return { success: true };
    }
    async refresh(res, userId, username, refreshToken) {
        const user = await this.users.findById(userId);
        if (!user || !user.refreshTokenHash)
            throw new common_1.UnauthorizedException();
        const match = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!match)
            throw new common_1.UnauthorizedException();
        const access = await this.signAccess(userId, username);
        const newRefresh = await this.signRefresh(userId, username);
        await this.users.setRefreshTokenHash(userId, await bcrypt.hash(newRefresh, 12));
        const isProd = process.env.NODE_ENV === 'production';
        const cookieOpts = {
            httpOnly: true,
            sameSite: isProd ? 'none' : 'lax',
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        };
        res.cookie(RT_COOKIE, newRefresh, cookieOpts);
        return { accessToken: access, user: { id: userId, username } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map