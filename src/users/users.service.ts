
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
  findByUsername(username: string) { return this.repo.findOne({ where: { username } }); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  create(data: Partial<User>) { return this.repo.save(this.repo.create(data)); }
  async setRefreshTokenHash(userId: string, hash: string | null) { await this.repo.update(userId, { refreshTokenHash: hash }); }
}
