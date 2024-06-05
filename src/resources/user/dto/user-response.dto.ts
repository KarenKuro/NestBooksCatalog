import { IUserResponse } from '@app/common/models';

export class UserResponseDTO implements IUserResponse {
  token: string;
}
