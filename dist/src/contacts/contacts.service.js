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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
let ContactsService = class ContactsService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(page = 1, limit = 20, q) {
        const where = q
            ? [
                { contactId: (0, typeorm_2.ILike)(`%${q}%`) },
                { accountNo: (0, typeorm_2.ILike)(`%${q}%`) },
                { forename: (0, typeorm_2.ILike)(`%${q}%`) },
                { surname: (0, typeorm_2.ILike)(`%${q}%`) },
                { telNo: (0, typeorm_2.ILike)(`%${q}%`) },
                { email: (0, typeorm_2.ILike)(`%${q}%`) },
            ]
            : {};
        const [items, total] = await this.repo.findAndCount({
            where,
            order: { surname: "ASC", forename: "ASC" },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { items, total, page, limit };
    }
    async get(id) {
        const c = await this.repo.findOne({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException("Contact not found");
        return c;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        const c = await this.get(id);
        Object.assign(c, dto);
        return this.repo.save(c);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { ok: true };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map