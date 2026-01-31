import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { BookingsModule } from "./bookings/bookings.module";
import { ClientsModule } from "./clients/clients.module";
import { CompaniesModule } from "./companies/companies.module";
import { VehiclesModule } from "./vehicles/vehicles.module";
import { DriversModule } from "./drivers/drivers.module";
import { ContactsModule } from "./contacts/contacts.module";
import { StaffModule } from "./staff/staff.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
    BookingsModule,
    ClientsModule,
    CompaniesModule,
    VehiclesModule,
    DriversModule,
    ContactsModule,
    StaffModule,
  ],
})
export class AppModule {}
