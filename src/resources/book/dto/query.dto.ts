import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryDTO {
  @ApiProperty({ example: 'Chechov', description: 'Author name' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: '5', description: 'Number of books' })
  @IsNumberString()
  @IsOptional()
  limit?: string;

  @ApiProperty({ example: '2', description: 'Offset' })
  @IsNumberString()
  @IsOptional()
  offset?: string;
}
