import { UserEntity } from '@app/common/entities';
import { Request } from 'express';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}
