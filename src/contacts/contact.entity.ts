import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // e.g. "100/Daniel" from the legacy UI (optional business id)
  @Column({ type: "varchar", length: 64, nullable: true })
  contactId!: string | null;

  // if you later relate to companies, keep this as string for now
  @Index()
  @Column({ type: "varchar", length: 64, nullable: true })
  accountNo!: string | null;

  @Column({ type: "varchar", length: 128, nullable: true })
  forename!: string | null;

  @Column({ type: "varchar", length: 128, nullable: true })
  surname!: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  telNo!: string | null;

  @Column({ type: "varchar", length: 128, nullable: true })
  email!: string | null;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
