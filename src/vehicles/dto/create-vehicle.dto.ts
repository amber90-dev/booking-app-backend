import { IsOptional, IsString, IsDateString } from "class-validator";

export class CreateVehicleDto {
  @IsOptional() @IsString() vehicleId?: string;
  @IsOptional() @IsString() driverNo?: string;
  @IsOptional() @IsString() registeredKeeper?: string;
  @IsOptional() @IsString() keeperAddress?: string;
  @IsOptional() @IsString() keeperPostcode?: string;
  @IsOptional() @IsString() make?: string;
  @IsOptional() @IsString() model?: string;

  @IsString() registrationNo!: string; // required

  @IsOptional() @IsString() colour?: string;

  @IsOptional() @IsDateString() motExpiryDate?: string;
  @IsOptional() @IsDateString() certOfInsExpiryDate?: string;
  @IsOptional() @IsDateString() carFirstAvailable?: string;
  @IsOptional() @IsDateString() carCeasedToBeAvailable?: string;
  @IsOptional() @IsDateString() pcoDriverExpiry?: string;
  @IsOptional() @IsDateString() pcoVehicleExpiry?: string;
}
