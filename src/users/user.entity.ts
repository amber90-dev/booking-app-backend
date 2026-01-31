import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ type: 'text', nullable: true, unique: true })
  email?: string | null;

  @Column({ type: 'text' })
  passwordHash!: string;

  @Column({ default: 'superadmin' })
  role!: string;

  // ✅ make the type explicit so TS doesn't reflect it as Object
  @Column({ type: 'text', nullable: true })
  refreshTokenHash!: string | null;

  @CreateDateColumn() createdAt!: Date;
}
