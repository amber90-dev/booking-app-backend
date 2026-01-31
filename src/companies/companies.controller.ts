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
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Get()
  list(
    @Query("page") page = "1",
    @Query("limit") limit = "20",
    @Query("q") q?: string
  ) {
    return this.service.findAll(parseInt(page, 10), parseInt(limit, 10), q);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCompanyDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
