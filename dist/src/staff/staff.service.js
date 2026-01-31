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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_entity_1 = require("./staff.entity");
let StaffService = class StaffService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(page = 1, limit = 20, q) {
        const where = q
            ? [
                { staffId: (0, typeorm_2.ILike)(`%${q}%`) },
                { forename: (0, typeorm_2.ILike)(`%${q}%`) },
                { surname: (0, typeorm_2.ILike)(`%${q}%`) },
                { town: (0, typeorm_2.ILike)(`%${q}%`) },
                { postcode: (0, typeorm_2.ILike)(`%${q}%`) },
            ]
            : {};
        const [items, total] = await this.repo.findAndCount({
            where,
            order: { staffId: "ASC" },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { items, total, page, limit };
    }
    async get(id) {
        const s = await this.repo.findOne({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException("Staff not found");
        return s;
    }
    async create(dto) {
        const exists = await this.repo.findOne({ where: { staffId: dto.staffId } });
        if (exists)
            throw new common_1.BadRequestException("Staff ID already exists");
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const s = await this.get(id);
        Object.assign(s, dto);
        return this.repo.save(s);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { ok: true };
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffService);
//# sourceMappingURL=staff.service.js.map