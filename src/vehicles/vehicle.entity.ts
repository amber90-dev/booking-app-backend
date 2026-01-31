import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // business id you show in UI (free text)
  @Column({ type: "varchar", length: 64, nullable: true })
  vehicleId!: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  driverNo!: string | null;

  @Column({ type: "varchar", length: 128, nullable: true })
  registeredKeeper!: string | null;

  @Column({ type: "varchar", length: 256, nullable: true })
  keeperAddress!: string | null;

  @Column({ type: "varchar", length: 32, nullable: true })
  keeperPostcode!: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  make!: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  model!: string | null;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 32 })
  registrationNo!: string; // required & unique

  @Column({ type: "varchar", length: 32, nullable: true })
  colour!: string | null;

  @Column({ type: "date", nullable: true }) motExpiryDate!: string | null;
  @Column({ type: "date", nullable: true }) certOfInsExpiryDate!: string | null;
  @Column({ type: "date", nullable: true }) carFirstAvailable!: string | null;
  @Column({ type: "date", nullable: true }) carCeasedToBeAvailable!:
    | string
    | null;
  @Column({ type: "date", nullable: true }) pcoDriverExpiry!: string | null;
  @Column({ type: "date", nullable: true }) pcoVehicleExpiry!: string | null;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
