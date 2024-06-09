import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@common/entities';
import { ICreateUser, IUser, IUserResponse } from '@app/common/models';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, SALT } from 'config';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposirory: Repository<UserEntity>,
  ) {}

  async create(body: ICreateUser): Promise<IUser> {
    const password = body.password;
    const hashedPassword = (await scrypt(password, SALT, 32)) as Buffer;
    body.password = hashedPassword.toString('hex');

    const user = this.userReposirory.create(body);
    return await this.userReposirory.save(user);
  }

  async signin(user: IUser, password: string): Promise<IUser> | null {
    const storedHash = user.password;
    const hash = (await scrypt(password, SALT, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      return null;
    }
    return user;
  }

  async findOne(id: number): Promise<IUser> {
    const user = await this.userReposirory.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<IUser[]> {
    const users = await this.userReposirory.findBy({ email });
    return users;
  }

  async findByUsername(username: string): Promise<IUser[]> {
    const users = await this.userReposirory.findBy({ username });
    return users;
  }

  async update(user: IUser, attrs: Partial<IUser>): Promise<IUser> {
    const updatedUser = Object.assign(user, attrs);

    return await this.userReposirory.save(updatedUser);
  }

  async remove(user: IUser): Promise<IUser> {
    const removedUser = await this.userReposirory.remove(user);
    return removedUser;
  }

  generateJwt(user: IUser): string {
    return sign(
      {
        id: user.id,
        // username: user.username,
        // email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '30 days',
      },
    );
  }

  buildUserResponse(user: IUser): IUserResponse {
    const userResponse = {
      token: this.generateJwt(user),
    };
    return userResponse;
    // const userResponse = new UserResponseDTO();
    // Object.assign(userResponse, user);
    // userResponse.token = this.generateJwt(user);

    // return {
    //   ...user,
    //   token: this.generateJwt(user),
    // };
  }
}
