import { IUser } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO implements IUser {
  @ApiProperty({ example: '123', description: 'User Id' })
  id: number;

  @ApiProperty({ example: 'Boris', description: 'User name' })
  username: string;

  @ApiProperty({ example: 'aaa@mail.com', description: 'Email' })
  email: string;

  password: string;
  createdAt: Date;
  updatedAt: Date;
}
