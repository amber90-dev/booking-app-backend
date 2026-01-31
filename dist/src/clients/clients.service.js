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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
let ClientsService = class ClientsService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(page = 1, limit = 20, q) {
        const where = q
            ? [
                { clientId: (0, typeorm_2.ILike)(`%${q}%`) },
                { forename: (0, typeorm_2.ILike)(`%${q}%`) },
                { surname: (0, typeorm_2.ILike)(`%${q}%`) },
                { address1: (0, typeorm_2.ILike)(`%${q}%`) },
                { town: (0, typeorm_2.ILike)(`%${q}%`) },
                { postcode: (0, typeorm_2.ILike)(`%${q}%`) },
            ]
            : {};
        const [items, total] = await this.repo.findAndCount({
            where,
            order: { clientId: "ASC" },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { items, total, page, limit };
    }
    async findOne(id) {
        const c = await this.repo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException("Client not found");
        return c;
    }
    async create(dto) {
        // keep clientId unique
        const exists = await this.repo.findOne({
            where: { clientId: dto.clientId },
        });
        if (exists)
            throw new Error("Client ID already exists");
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const c = await this.findOne(id);
        Object.assign(c, dto);
        return this.repo.save(c);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { ok: true };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map