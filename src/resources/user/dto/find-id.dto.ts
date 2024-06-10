import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindIdDTO {
  @ApiProperty({ example: '123', description: 'User Id' })
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
