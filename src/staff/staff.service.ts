import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Staff } from "./staff.entity";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) private repo: Repository<Staff>) {}

  async list(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { staffId: ILike(`%${q}%`) },
          { forename: ILike(`%${q}%`) },
          { surname: ILike(`%${q}%`) },
          { town: ILike(`%${q}%`) },
          { postcode: ILike(`%${q}%`) },
        ]
      : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      order: { staffId: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  async get(id: string) {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException("Staff not found");
    return s;
  }

  async create(dto: CreateStaffDto) {
    const exists = await this.repo.findOne({ where: { staffId: dto.staffId } });
    if (exists) throw new BadRequestException("Staff ID already exists");
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateStaffDto) {
    const s = await this.get(id);
    Object.assign(s, dto);
    return this.repo.save(s);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
