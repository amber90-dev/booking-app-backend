import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Client } from "./client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  async findAll(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { clientId: ILike(`%${q}%`) },
          { forename: ILike(`%${q}%`) },
          { surname: ILike(`%${q}%`) },
          { address1: ILike(`%${q}%`) },
          { town: ILike(`%${q}%`) },
          { postcode: ILike(`%${q}%`) },
        ]
      : {};

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { clientId: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Client not found");
    return c;
  }

  async create(dto: CreateClientDto) {
    // keep clientId unique
    const exists = await this.repo.findOne({
      where: { clientId: dto.clientId },
    });
    if (exists) throw new Error("Client ID already exists");
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateClientDto) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
