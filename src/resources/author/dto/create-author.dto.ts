import { ICreateAuthor } from '@app/common/models';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDTO implements ICreateAuthor {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly biography: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
}
