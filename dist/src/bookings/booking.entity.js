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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "bookingRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "accountNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "costCentre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "companyTelNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "vip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "contactForename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "contactSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "contactTelNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "staffForename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "staffSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "staffTelNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "dateTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 16, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "timeTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientForename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientAddress1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientAddress2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientTown", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientPostcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientTelNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "clientMobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "driverNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "driverForename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "driverSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "driverMobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 16, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "pickUpAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "dropOffAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "via", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "extraInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "detailsGiven", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "cancelled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientScheduledFare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientMeetGreet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientWaitingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientWaitingTimePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientLhrGtwCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "clientTelUsedMins", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientTelCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "clientCarPark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "totalClient", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverScheduledFare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverMeetGreet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverWaitingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverWaitingTimePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverLhrGtwCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "driverTelUsedMins", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverTelCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "driverCarPark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Booking.prototype, "totalDriver", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)("bookings")
], Booking);
//# sourceMappingURL=booking.entity.js.map