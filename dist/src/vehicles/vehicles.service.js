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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
let VehiclesService = class VehiclesService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(page = 1, limit = 20, q) {
        const where = q
            ? [
                { registrationNo: (0, typeorm_2.ILike)(`%${q}%`) },
                { make: (0, typeorm_2.ILike)(`%${q}%`) },
                { model: (0, typeorm_2.ILike)(`%${q}%`) },
                { driverNo: (0, typeorm_2.ILike)(`%${q}%`) },
            ]
            : {};
        const [items, total] = await this.repo.findAndCount({
            where,
            order: { registrationNo: "ASC" },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { items, total, page, limit };
    }
    async get(id) {
        const v = await this.repo.findOne({ where: { id } });
        if (!v)
            throw new common_1.NotFoundException("Vehicle not found");
        return v;
    }
    async create(dto) {
        const exists = await this.repo.findOne({
            where: { registrationNo: dto.registrationNo },
        });
        if (exists)
            throw new common_1.BadRequestException("Registration already exists");
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const v = await this.get(id);
        Object.assign(v, dto);
        return this.repo.save(v);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { ok: true };
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map