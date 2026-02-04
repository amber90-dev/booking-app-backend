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
        const query = this.repo.createQueryBuilder("b")
            .leftJoin("companies", "c", "CAST(c.id AS TEXT) = b.accountNo")
            .leftJoin("drivers", "d", "CAST(d.id AS TEXT) = b.driverNo")
            .select("b.*")
            .addSelect("c.accountNo", "company_accountNo")
            .addSelect("d.driverNo", "driver_driverNo");
        if (q) {
            query.andWhere("(b.bookingRef ILIKE :q OR b.clientId ILIKE :q OR b.pickUpAddress ILIKE :q OR b.dropOffAddress ILIKE :q)", { q: `%${q}%` });
        }
        if (cancelled !== undefined) {
            query.andWhere("b.cancelled = :cancelled", { cancelled });
        }
        query.orderBy("b.date", "DESC").addOrderBy("b.time", "DESC");
        // Pagination
        query.skip((page - 1) * limit).take(limit);
        const count = await query.getCount();
        const raw = await query.getRawMany();
        // Map raw results back to Booking-like objects
        const items = raw.map(row => {
            // Manual mapping since getRawMany flattens everything
            // Depending on driver, field names might be b_id or id. 
            // Usually TypeORM with prefix 'b' outputs 'b_field'.
            // Let's check keys dynamically or assume standard behavior.
            const booking = {};
            // Standardize fields from "b_" prefix
            Object.keys(row).forEach(k => {
                if (k.startsWith("b_")) {
                    booking[k.substring(2)] = row[k];
                }
                else if (k === "company_accountNo" || k === "driver_driverNo") {
                    // ignore here, handle below
                }
                else {
                    // fallback for unprefixed columns if any
                    // booking[k] = row[k]; 
                }
            });
            // Fallback if empty (some drivers don't prefix strictly?) 
            // Actually simply:
            if (!booking.id && row.id)
                Object.assign(booking, row);
            // Now override AccountNo / DriverNo
            if (row.company_accountNo)
                booking.accountNo = row.company_accountNo;
            if (row.driver_driverNo)
                booking.driverNo = row.driver_driverNo;
            return booking;
        });
        return { items, total: count, page, limit };
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