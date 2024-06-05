import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindIdDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
