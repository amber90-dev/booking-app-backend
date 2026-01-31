import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("staff")
export class Staff {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 64 })
  staffId!: string; // required (business id from legacy)

  @Column({ type: "varchar", length: 128, nullable: true }) forename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) surname!:
    | string
    | null;

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
  @Column({ type: "varchar", length: 64, nullable: true }) mobile!:
    | string
    | null;

  @Column({ type: "date", nullable: true }) dob!: string | null;
  @Column({ type: "varchar", length: 32, nullable: true })
  nationalInsuranceNo!: string | null;

  @Column({ type: "date", nullable: true }) startDate!: string | null;
  @Column({ type: "date", nullable: true }) finishDate!: string | null;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
