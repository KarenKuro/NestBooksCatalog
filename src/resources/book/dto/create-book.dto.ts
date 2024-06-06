import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly isbn: string;

  @IsDateString()
  @IsNotEmpty()
  readonly publishedDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly authorName: string;
}
