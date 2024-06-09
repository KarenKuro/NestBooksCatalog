import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryDTO {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsNumberString()
  @IsOptional()
  offset?: string;
}
