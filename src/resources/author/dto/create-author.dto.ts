import { ICreateAuthor } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDTO implements ICreateAuthor {
  @ApiProperty({
    example: 'Chechov',
    description: 'Author name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Author biography' })
  @IsString()
  @IsNotEmpty()
  readonly biography: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsDateString()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
}
