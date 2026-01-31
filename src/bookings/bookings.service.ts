
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}

  async create(dto: CreateBookingDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(page = 1, limit = 20, q?: string, cancelled?: boolean) {
    const whereParts: FindOptionsWhere<Booking>[] = [];
    if (q) {
      whereParts.push(
        { bookingRef: ILike(`%${q}%`) },
        { clientId: ILike(`%${q}%`) },
        { pickUpAddress: ILike(`%${q}%`) },
        { dropOffAddress: ILike(`%${q}%`) }
      );
    }
    const where = whereParts.length ? whereParts : {};
    const finalWhere: any = whereParts.length
      ? whereParts.map((w) => ({
          ...w,
          ...(cancelled !== undefined ? { cancelled } : {}),
        }))
      : cancelled !== undefined
      ? { cancelled }
      : {};
    const [items, total] = await this.repo.findAndCount({
      where: finalWhere,
      order: { date: "DESC", time: "DESC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateBookingDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true };
  }
}
