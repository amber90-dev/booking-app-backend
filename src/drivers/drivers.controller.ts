import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";
import { DriversService } from "./drivers.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";

@Controller("drivers")
export class DriversController {
  constructor(private readonly svc: DriversService) {}

  @Get()
  list(
    @Query("page") page = "1",
    @Query("limit") limit = "20",
    @Query("q") q?: string
  ) {
    return this.svc.list(parseInt(page, 10), parseInt(limit, 10), q);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.svc.get(id);
  }

  @Post()
  create(@Body() dto: CreateDriverDto) {
    return this.svc.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDriverDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
