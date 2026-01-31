import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../ormconfig';
import { User } from './users/user.entity';
import * as bcrypt from 'bcrypt';

async function run() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const username = process.env.SEED_SUPERADMIN_USERNAME || 'superadmin';
  const email = process.env.SEED_SUPERADMIN_EMAIL || 'superadmin@example.com';
  const password = process.env.SEED_SUPERADMIN_PASSWORD || 'supersecret';

  let user = await repo.findOne({ where: { username } });
  if (!user) {
    user = repo.create({
      username,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: 'superadmin'
    });
    await repo.save(user);
    console.log('Seeded superadmin:', username);
  } else {
    console.log('Superadmin already exists:', username);
  }
  await AppDataSource.destroy();
}

run().catch(e => { console.error(e); process.exit(1); });
