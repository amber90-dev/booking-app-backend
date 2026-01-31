import { IsOptional, IsString, IsEmail } from "class-validator";

export class CreateContactDto {
  @IsOptional() @IsString() contactId?: string;
  @IsOptional() @IsString() accountNo?: string;
  @IsOptional() @IsString() forename?: string;
  @IsOptional() @IsString() surname?: string;
  @IsOptional() @IsString() telNo?: string;
  @IsOptional() @IsEmail() email?: string;
}
