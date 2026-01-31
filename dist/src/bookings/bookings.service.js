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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingsService = class BookingsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async findAll(page = 1, limit = 20, q, cancelled) {
        const whereParts = [];
        if (q) {
            whereParts.push({ bookingRef: (0, typeorm_2.ILike)(`%${q}%`) }, { clientId: (0, typeorm_2.ILike)(`%${q}%`) }, { pickUpAddress: (0, typeorm_2.ILike)(`%${q}%`) }, { dropOffAddress: (0, typeorm_2.ILike)(`%${q}%`) });
        }
        const where = whereParts.length ? whereParts : {};
        const finalWhere = whereParts.length
            ? whereParts.map((w) => ({
                ...w,
                ...(cancelled !== undefined ? { cancelled } : {}),
            }))
            : cancelled !== undefined
                ? { cancelled }
                : {};
        const [items, total] = await this.repo.findAndCount({
            where: finalWhere,
            order: { date: "DESC", time: "DESC" },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { items, total, page, limit };
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { success: true };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map