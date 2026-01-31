
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true,
  logging: false
});

export default AppDataSource;
