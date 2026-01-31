import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 64 })
  accountNo!: string; // "101"

  @Column({ type: "varchar", length: 256 })
  name!: string; // "Company Name"

  @Column({ type: "varchar", length: 256, nullable: true }) address1!:
    | string
    | null;
  @Column({ type: "varchar", length: 256, nullable: true }) address2!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) town!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) county!:
    | string
    | null;
  @Column({ type: "varchar", length: 32, nullable: true }) postcode!:
    | string
    | null;

  @Column({ type: "varchar", length: 64, nullable: true }) telNo!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) faxNo!:
    | string
    | null;

  @Column({ type: "int", nullable: true, default: 0 }) daysToPay!:
    | number
    | null;
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  surcharge!: string | null;

  @Column({ type: "text", nullable: true }) notes!: string | null;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
