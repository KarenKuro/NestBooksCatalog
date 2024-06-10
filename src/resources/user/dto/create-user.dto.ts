import { ICreateUser } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO implements ICreateUser {
  @ApiProperty({
    example: 'Boris',
    description: 'User name',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: 'aaa@mail.com',
    description: 'Email',
    uniqueItems: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123QWERTY', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
