import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Company } from "./company.entity";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

  async findAll(page = 1, limit = 20, q?: string) {
    const where = q
      ? [
          { accountNo: ILike(`%${q}%`) },
          { name: ILike(`%${q}%`) },
          { address1: ILike(`%${q}%`) },
          { town: ILike(`%${q}%`) },
          { postcode: ILike(`%${q}%`) },
        ]
      : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      order: { name: "ASC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException("Company not found");
    return c;
  }

  async create(dto: CreateCompanyDto) {
    const exists = await this.repo.findOne({
      where: { accountNo: dto.accountNo },
    });
    if (exists) throw new BadRequestException("Account No already exists");
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateCompanyDto) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { ok: true };
  }
}
