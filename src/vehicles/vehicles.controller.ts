import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly svc: VehiclesService) {}

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
  create(@Body() dto: CreateVehicleDto) {
    return this.svc.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateVehicleDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
