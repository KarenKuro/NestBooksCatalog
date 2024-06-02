import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindIDDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
