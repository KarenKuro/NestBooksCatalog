import { ICreateUser } from '@app/common/models';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
