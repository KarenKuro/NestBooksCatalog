import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
