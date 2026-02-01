import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBookingDto {
  // Booking / Company
  @IsOptional() @IsString() bookingRef?: string;
  @IsOptional() @IsString() accountNo?: string;
  @IsOptional() @IsString() costCentre?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() companyTelNo?: string;
  @IsOptional() @IsBoolean() vip?: boolean;

  // Contact
  @IsOptional() @IsString() contactId?: string;
  @IsOptional() @IsString() contactForename?: string;
  @IsOptional() @IsString() contactSurname?: string;
  @IsOptional() @IsString() contactTelNo?: string;

  // Staff
  @IsOptional() @IsString() staffId?: string;
  @IsOptional() @IsString() staffForename?: string;
  @IsOptional() @IsString() staffSurname?: string;
  @IsOptional() @IsString() staffTelNo?: string;
  @IsOptional() @IsDateString() dateTaken?: string;
  @IsOptional() @IsString() timeTaken?: string;

  // Client
  @IsOptional() @IsString() clientId?: string;
  @IsOptional() @IsString() clientForename?: string;
  @IsOptional() @IsString() clientSurname?: string;
  @IsOptional() @IsString() clientAddress1?: string;
  @IsOptional() @IsString() clientAddress2?: string;
  @IsOptional() @IsString() clientTown?: string;
  @IsOptional() @IsString() clientPostcode?: string;
  @IsOptional() @IsString() clientTelNo?: string;
  @IsOptional() @IsString() clientMobile?: string;

  // Driver
  @IsOptional() @IsString() driverNo?: string;
  @IsOptional() @IsString() driverForename?: string;
  @IsOptional() @IsString() driverSurname?: string;
  @IsOptional() @IsString() driverMobile?: string;

  // Trip
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsString() time?: string;
  @IsOptional() @IsString() pickUpAddress?: string;
  @IsOptional() @IsString() dropOffAddress?: string;
  @IsOptional() @IsString() via?: string;
  @IsOptional() @IsString() extraInfo?: string;
  @IsOptional() @IsBoolean() detailsGiven?: boolean;
  @IsOptional() @IsString() vehicle?: string;
  @IsOptional() @IsBoolean() cancelled?: boolean;

  // Client Fare
  @IsOptional() @IsNumberString() clientScheduledFare?: string;
  @IsOptional() @IsNumberString() clientCharge?: string;
  @IsOptional() @IsNumberString() clientMeetGreet?: string;
  @IsOptional() @IsNumberString() clientWaitingTime?: string;
  @IsOptional() @IsNumberString() clientWaitingTimePrice?: string;
  @IsOptional() @IsNumberString() clientLhrGtwCharge?: string;

  // @IsOptional() @IsInt() clientTelUsedMins?: number;
  // @IsOptional() @IsNumberString() clientTelCharge?: string;
  @IsOptional() @IsNumberString() clientViaPrice?: string;
  @IsOptional() @IsNumberString() clientGratuity?: string;

  @IsOptional() @IsNumberString() clientCarPark?: string;
  @IsOptional() @IsNumberString() totalClient?: string;

  // Driver Fare
  @IsOptional() @IsNumberString() driverScheduledFare?: string;
  @IsOptional() @IsNumberString() driverCharge?: string;
  @IsOptional() @IsNumberString() driverMeetGreet?: string;
  @IsOptional() @IsNumberString() driverWaitingTime?: string;
  @IsOptional() @IsNumberString() driverWaitingTimePrice?: string;
  @IsOptional() @IsNumberString() driverLhrGtwCharge?: string;

  // @IsOptional() @IsInt() driverTelUsedMins?: number;
  // @IsOptional() @IsNumberString() driverTelCharge?: string;
  @IsOptional() @IsNumberString() driverViaPrice?: string;
  @IsOptional() @IsNumberString() driverGratuity?: string;

  @IsOptional() @IsNumberString() driverCarPark?: string; // Check type? Original was string in entity but maybe user wants clean up? sticking to string for consistnecy
  @IsOptional() @IsNumberString() totalDriver?: string;
}
