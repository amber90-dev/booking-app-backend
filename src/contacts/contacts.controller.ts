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
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly svc: ContactsService) {}

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
  create(@Body() dto: CreateContactDto) {
    return this.svc.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateContactDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
