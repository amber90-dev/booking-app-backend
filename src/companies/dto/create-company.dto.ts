import { IsOptional, IsString, IsInt, Min } from "class-validator";

export class CreateCompanyDto {
  @IsString() accountNo!: string;
  @IsString() name!: string;

  @IsOptional() @IsString() address1?: string;
  @IsOptional() @IsString() address2?: string;
  @IsOptional() @IsString() town?: string;
  @IsOptional() @IsString() county?: string;
  @IsOptional() @IsString() postcode?: string;

  @IsOptional() @IsString() telNo?: string;
  @IsOptional() @IsString() faxNo?: string;

  @IsOptional() @IsInt() @Min(0) daysToPay?: number;
  @IsOptional() @IsString() surcharge?: string; // "0" or "12.50"

  @IsOptional() @IsString() notes?: string;
}
