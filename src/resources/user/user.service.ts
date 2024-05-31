import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '@app/common/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposirory: Repository<UserEntity>,
  ) {}

  async createUser(body: ICreateUser): Promise<UserEntity> {
    const user = this.userReposirory.create(body);

    return await this.userReposirory.save(user);
  }

  update() {}

  remove() {}
}
