import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  async list(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { registrationNo: ILike(`%${q}%`) },
          { make: ILike(`%${q}%`) },
          { model: ILike(`%${q}%`) },
          { driverNo: ILike(`%${q}%`) },
        ]
      : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      order: { registrationNo: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  async get(id: string) {
    const v = await this.repo.findOne({ where: { id } });
    if (!v) throw new NotFoundException("Vehicle not found");
    return v;
  }

  async create(dto: CreateVehicleDto) {
    const exists = await this.repo.findOne({
      where: { registrationNo: dto.registrationNo },
    });
    if (exists) throw new BadRequestException("Registration already exists");
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const v = await this.get(id);
    Object.assign(v, dto);
    return this.repo.save(v);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
