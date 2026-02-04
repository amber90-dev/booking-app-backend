
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
    const query = this.repo.createQueryBuilder("b")
      .leftJoin("companies", "c", "CAST(c.id AS TEXT) = b.accountNo")
      .leftJoin("drivers", "d", "CAST(d.id AS TEXT) = b.driverNo")
      .select("b.*")
      .addSelect("c.accountNo", "company_accountNo")
      .addSelect("d.driverNo", "driver_driverNo");

    if (q) {
      query.andWhere(
        "(b.bookingRef ILIKE :q OR b.clientId ILIKE :q OR b.pickUpAddress ILIKE :q OR b.dropOffAddress ILIKE :q)", 
        { q: `%${q}%` }
      );
    }

    if (cancelled !== undefined) {
      query.andWhere("b.cancelled = :cancelled", { cancelled });
    }

    query.orderBy("b.date", "DESC").addOrderBy("b.time", "DESC");
    
    // Pagination
    query.skip((page - 1) * limit).take(limit);

    const count = await query.getCount();
    const raw = await query.getRawMany();

    // Map raw results back to Booking-like objects
    const items = raw.map(row => {
      // Manual mapping since getRawMany flattens everything
      // Depending on driver, field names might be b_id or id. 
      // Usually TypeORM with prefix 'b' outputs 'b_field'.
      // Let's check keys dynamically or assume standard behavior.
      const booking: any = {};
      
      // Standardize fields from "b_" prefix
      Object.keys(row).forEach(k => {
          if (k.startsWith("b_")) {
              booking[k.substring(2)] = row[k];
          } else if (k === "company_accountNo" || k === "driver_driverNo") {
              // ignore here, handle below
          } else {
              // fallback for unprefixed columns if any
              // booking[k] = row[k]; 
          }
      });
      // Fallback if empty (some drivers don't prefix strictly?) 
      // Actually simply:
      if (!booking.id && row.id) Object.assign(booking, row);

      // Now override AccountNo / DriverNo
      if (row.company_accountNo) booking.accountNo = row.company_accountNo;
      if (row.driver_driverNo) booking.driverNo = row.driver_driverNo;
      
      return booking;
    });

    return { items, total: count, page, limit };
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
