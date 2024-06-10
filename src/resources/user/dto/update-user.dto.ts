import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    example: 'Boris',
    description: 'User name',
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    example: 'aaa@mail.com',
    description: 'Email',
    uniqueItems: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'aaa@mail.com', description: 'Email' })
  @ApiProperty({ example: '123QWERTY', description: 'User password' })
  @IsString()
  @IsOptional()
  password: string;
}
