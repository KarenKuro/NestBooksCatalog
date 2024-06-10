import { ITokenResponse } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDTO implements ITokenResponse {
  @ApiProperty({ example: 'qwerty', description: 'Token' })
  token: string;
}
