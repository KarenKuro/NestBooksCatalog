import { ICreateUser } from '@app/common/models';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO implements ICreateUser {
  @IsString()
  readonly username: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
