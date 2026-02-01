import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid") id!: string;

  // ---------- Booking / Company ----------
  @Column({ type: "varchar", length: 64, nullable: true }) bookingRef!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) accountNo!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) costCentre!:
    | string
    | null;
  @Column({ type: "varchar", length: 256, nullable: true }) companyName!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) companyTelNo!:
    | string
    | null;
  @Column({ type: "boolean", default: false }) vip!: boolean;

  // ---------- Contact ----------
  @Column({ type: "varchar", length: 128, nullable: true }) contactId!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) contactForename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) contactSurname!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) contactTelNo!:
    | string
    | null;

  // ---------- Staff ----------
  @Column({ type: "varchar", length: 64, nullable: true }) staffId!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) staffForename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) staffSurname!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) staffTelNo!:
    | string
    | null;
  @Column({ type: "date", nullable: true }) dateTaken!: string | null; // YYYY-MM-DD
  @Column({ type: "varchar", length: 16, nullable: true }) timeTaken!:
    | string
    | null; // HH:mm

  // ---------- Client ----------
  @Column({ type: "varchar", length: 128, nullable: true }) clientId!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) clientForename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) clientSurname!:
    | string
    | null;
  @Column({ type: "varchar", length: 256, nullable: true }) clientAddress1!:
    | string
    | null;
  @Column({ type: "varchar", length: 256, nullable: true }) clientAddress2!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) clientTown!:
    | string
    | null;
  @Column({ type: "varchar", length: 32, nullable: true }) clientPostcode!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) clientTelNo!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) clientMobile!:
    | string
    | null;

  // ---------- Driver ----------
  @Column({ type: "varchar", length: 64, nullable: true }) driverNo!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) driverForename!:
    | string
    | null;
  @Column({ type: "varchar", length: 128, nullable: true }) driverSurname!:
    | string
    | null;
  @Column({ type: "varchar", length: 64, nullable: true }) driverMobile!:
    | string
    | null;

  // ---------- Trip ----------
  @Column({ type: "date", nullable: true }) date!: string | null; // YYYY-MM-DD
  @Column({ type: "varchar", length: 16, nullable: true }) time!: string | null; // HH:mm
  @Column({ type: "text", nullable: true }) pickUpAddress!: string | null;
  @Column({ type: "text", nullable: true }) dropOffAddress!: string | null;
  @Column({ type: "text", nullable: true }) via!: string | null;
  @Column({ type: "text", nullable: true }) extraInfo!: string | null;
  @Column({ type: "boolean", default: false }) detailsGiven!: boolean;
  @Column({ type: "varchar", length: 64, nullable: true }) vehicle!:
    | string
    | null;
  @Column({ type: "boolean", default: false }) cancelled!: boolean;

  // ---------- Client Fare Breakdown ----------
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientScheduledFare!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientCharge!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientMeetGreet!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientWaitingTime!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientWaitingTimePrice!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientLhrGtwCharge!: string;

  // Replaced clientTelUsedMins/clientTelCharge with Gratuity and Via logic
  // Keeping old columns commented for safety or migration if needed
  // @Column({ type: "integer", default: 0 }) clientTelUsedMins!: number;
  // @Column({ type: "numeric", precision: 12, scale: 2, default: 0 }) clientTelCharge!: string;
  
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientViaPrice!: string; // [NEW]

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientGratuity!: string; // [NEW]

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  clientCarPark!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  totalClient!: string;

  // ---------- Driver Fare Breakdown ----------
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverScheduledFare!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverCharge!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverMeetGreet!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverWaitingTime!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverWaitingTimePrice!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverLhrGtwCharge!: string;

  // Replaced driverTelUsedMins/driverTelCharge with Gratuity and Via logic
  // @Column({ type: "integer", default: 0 }) driverTelUsedMins!: number;
  // @Column({ type: "numeric", precision: 12, scale: 2, default: 0 }) driverTelCharge!: string;

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverViaPrice!: string; // [NEW]

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverGratuity!: string; // [NEW]

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  driverCarPark!: string;
  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  totalDriver!: string;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotals() {
    // Helper to parse string to float, default to 0
    const parse = (val: string | number | null | undefined) => {
      if (!val) return 0;
      const num = parseFloat(val.toString());
      return isNaN(num) ? 0 : num;
    };

    // Client Total
    const cTotal =
      parse(this.clientScheduledFare) +
      parse(this.clientCharge) +
      parse(this.clientMeetGreet) +
      parse(this.clientWaitingTimePrice) + // Waiting time price, not mins
      parse(this.clientLhrGtwCharge) +
      parse(this.clientViaPrice) +
      parse(this.clientGratuity) +
      parse(this.clientCarPark);
    
    this.totalClient = cTotal.toFixed(2);

    // Driver Total
    const dTotal =
      parse(this.driverScheduledFare) +
      parse(this.driverCharge) +
      parse(this.driverMeetGreet) +
      parse(this.driverWaitingTimePrice) +
      parse(this.driverLhrGtwCharge) +
      parse(this.driverViaPrice) +
      parse(this.driverGratuity) +
      parse(this.driverCarPark);
      
    this.totalDriver = dTotal.toFixed(2);
  }
}
