import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDTO {
  @ApiProperty({ example: 'The Cherry Orchard', description: 'Book title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: '1111111', description: 'Book ISBN' })
  @IsString()
  @IsNotEmpty()
  readonly isbn: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsDateString()
  @IsNotEmpty()
  readonly publishedDate: Date;

  @ApiProperty({ example: 'Chechov', description: 'Book author' })
  @IsString()
  @IsNotEmpty()
  readonly authorName: string;
}
