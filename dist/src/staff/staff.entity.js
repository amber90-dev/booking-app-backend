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
exports.Staff = void 0;
const typeorm_1 = require("typeorm");
let Staff = class Staff {
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], Staff.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "forename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "address1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "address2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "town", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "county", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "postcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "telNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32, nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "nationalInsuranceNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Staff.prototype, "finishDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Staff.prototype, "updatedAt", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)("staff")
], Staff);
//# sourceMappingURL=staff.entity.js.map