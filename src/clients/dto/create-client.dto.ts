import { IsOptional, IsString } from "class-validator";

export class CreateClientDto {
  @IsString() clientId!: string;

  @IsOptional() @IsString() accountNo?: string;
  @IsOptional() @IsString() forename?: string;
  @IsOptional() @IsString() surname?: string;

  @IsOptional() @IsString() address1?: string;
  @IsOptional() @IsString() address2?: string;
  @IsOptional() @IsString() town?: string;
  @IsOptional() @IsString() county?: string;
  @IsOptional() @IsString() postcode?: string;

  @IsOptional() @IsString() telNo?: string;
  @IsOptional() @IsString() mobile?: string;
}
