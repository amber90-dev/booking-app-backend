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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], Company.prototype, "accountNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "address1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "address2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "town", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "county", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "postcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "telNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "faxNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, default: 0 }),
    __metadata("design:type", Object)
], Company.prototype, "daysToPay", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: true,
        default: 0,
    }),
    __metadata("design:type", Object)
], Company.prototype, "surcharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)("companies")
], Company);
//# sourceMappingURL=company.entity.js.map