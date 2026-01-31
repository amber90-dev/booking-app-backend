import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Driver } from "./driver.entity";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";

@Injectable()
export class DriversService {
  constructor(@InjectRepository(Driver) private repo: Repository<Driver>) {}

  async list(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { driverNo: ILike(`%${q}%`) },
          { forename: ILike(`%${q}%`) },
          { surname: ILike(`%${q}%`) },
          { postcode: ILike(`%${q}%`) },
          { mobile: ILike(`%${q}%`) },
        ]
      : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      order: { driverNo: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  async get(id: string) {
    const d = await this.repo.findOne({ where: { id } });
    if (!d) throw new NotFoundException("Driver not found");
    return d;
  }

  async create(dto: CreateDriverDto) {
    const exists = await this.repo.findOne({
      where: { driverNo: dto.driverNo },
    });
    if (exists) throw new BadRequestException("Driver No already exists");
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateDriverDto) {
    const d = await this.get(id);
    Object.assign(d, dto);
    return this.repo.save(d);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
