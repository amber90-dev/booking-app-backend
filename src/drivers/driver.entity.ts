import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("drivers")
export class Driver {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 64 })
  driverNo!: string; // required

  @Column({ type: "varchar", length: 128, nullable: true }) forename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) surname!:
    | string
    | null;

  @Column({ type: "varchar", length: 64, nullable: true }) telNo!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) mobile!:
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

  @Column({ type: "date", nullable: true }) dateOfBirth!: string | null;
  @Column({ type: "varchar", length: 32, nullable: true })
  nationalInsuranceNo!: string | null;

  @Column({ type: "date", nullable: true }) startDate!: string | null;
  @Column({ type: "date", nullable: true }) finishDate!: string | null;

  // Optional photo URL if you need that big box from the legacy UI
  @Column({ type: "varchar", length: 512, nullable: true }) photoUrl!:
    | string
    | null;

  @Column({ type: "text", nullable: true }) notes!: string | null;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
