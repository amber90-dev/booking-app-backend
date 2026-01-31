import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@UseGuards(JwtAuthGuard)
@Controller("bookings")
export class BookingsController {
  constructor(private service: BookingsService) {}

  @Post() create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }
  @Get()
  list(
    @Query("page") page = "1",
    @Query("limit") limit = "20",
    @Query("q") q?: string,
    @Query("cancelled") cancelled?: string
  ) {
    const cancelledBool =
      cancelled === "true" ? true : cancelled === "false" ? false : undefined;
    return this.service.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
      q,
      cancelledBool
    );
  }

  @Get(":id") get(@Param("id") id: string) {
    return this.service.findOne(id);
  }
  @Put(":id") update(@Param("id") id: string, @Body() dto: UpdateBookingDto) {
    return this.service.update(id, dto);
  }
  @Delete(":id") del(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
