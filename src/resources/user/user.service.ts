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

  async create(body: ICreateUser): Promise<UserEntity> {
    //Спросить у Матоса почему так???
    const user = this.userReposirory.create(body);
    return await this.userReposirory.save(user);
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userReposirory.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    const users = await this.userReposirory.findBy({ email });
    return users;
  }

  async findByUsername(username: string): Promise<UserEntity[]> {
    const users = await this.userReposirory.findBy({ username });
    return users;
  }

  async update(
    user: UserEntity,
    attrs: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const updatedUser = Object.assign(user, attrs);
    return updatedUser;
  }

  async remove(user: UserEntity) {
    const removedUser = await this.userReposirory.remove(user);
    return removedUser;
  }
}
