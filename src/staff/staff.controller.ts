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
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";

@Controller("staff")
export class StaffController {
  constructor(private readonly svc: StaffService) {}

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
  create(@Body() dto: CreateStaffDto) {
    return this.svc.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateStaffDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
