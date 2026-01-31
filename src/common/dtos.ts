
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString() username!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsString() @MinLength(6) password!: string;
}

export class LoginDto {
  @IsString() username!: string;
  @IsString() password!: string;
}
