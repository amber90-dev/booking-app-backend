"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/user.entity");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const bookings_module_1 = require("./bookings/bookings.module");
const clients_module_1 = require("./clients/clients.module");
const companies_module_1 = require("./companies/companies.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const drivers_module_1 = require("./drivers/drivers.module");
const contacts_module_1 = require("./contacts/contacts.module");
const staff_module_1 = require("./staff/staff.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            bookings_module_1.BookingsModule,
            clients_module_1.ClientsModule,
            companies_module_1.CompaniesModule,
            vehicles_module_1.VehiclesModule,
            drivers_module_1.DriversModule,
            contacts_module_1.ContactsModule,
            staff_module_1.StaffModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map