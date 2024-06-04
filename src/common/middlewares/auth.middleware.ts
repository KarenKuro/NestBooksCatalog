import { UserService } from '@app/resources';
import { FindIDDTO } from '@app/resources/user/dto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWT_SECRET } from 'config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IExpressRequest } from '../models';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET) as FindIDDTO;
      const user = await this.userService.findOne(+decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;

      next();
    }
  }
}
