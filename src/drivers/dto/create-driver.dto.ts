import { IsOptional, IsString, IsDateString } from "class-validator";

export class CreateDriverDto {
  @IsString() driverNo!: string; // required

  @IsOptional() @IsString() forename?: string;
  @IsOptional() @IsString() surname?: string;

  @IsOptional() @IsString() telNo?: string;
  @IsOptional() @IsString() mobile?: string;

  @IsOptional() @IsString() address1?: string;
  @IsOptional() @IsString() address2?: string;
  @IsOptional() @IsString() town?: string;
  @IsOptional() @IsString() county?: string;
  @IsOptional() @IsString() postcode?: string;

  @IsOptional() @IsDateString() dateOfBirth?: string;
  @IsOptional() @IsString() nationalInsuranceNo?: string;

  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() finishDate?: string;

  @IsOptional() @IsString() photoUrl?: string;
  @IsOptional() @IsString() notes?: string;
}
