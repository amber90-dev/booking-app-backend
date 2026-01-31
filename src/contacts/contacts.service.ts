import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Contact } from "./contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  async list(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { contactId: ILike(`%${q}%`) },
          { accountNo: ILike(`%${q}%`) },
          { forename: ILike(`%${q}%`) },
          { surname: ILike(`%${q}%`) },
          { telNo: ILike(`%${q}%`) },
          { email: ILike(`%${q}%`) },
        ]
      : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      order: { surname: "ASC", forename: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  async get(id: string) {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Contact not found");
    return c;
  }

  create(dto: CreateContactDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateContactDto) {
    const c = await this.get(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
