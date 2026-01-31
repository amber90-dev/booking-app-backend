import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid") id!: string;

  // Legacy-style fields
  @Index({ unique: true })
  @Column({ type: "varchar", length: 128 })
  clientId!: string; // e.g. "D" or "223/Goldberg"

  @Column({ type: "varchar", length: 64, nullable: true }) accountNo!:
    | string
    | null;
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

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
