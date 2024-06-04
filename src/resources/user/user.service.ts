import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@common/entities';
import { ICreateUser } from '@app/common/models';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { UserResponseDTO } from './dto/user-response.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposirory: Repository<UserEntity>,
  ) {}

  async create(body: ICreateUser): Promise<UserEntity> {
    //Спросить у Матоса почему так???
    const password = body.password;
    const hashedPassword = (await scrypt(password, 'MySalt', 32)) as Buffer;
    body.password = hashedPassword.toString('hex');

    const user = this.userReposirory.create(body);
    return await this.userReposirory.save(user);
  }

  async signin(email: string, password: string): Promise<UserEntity> {
    const [user] = await this.findByEmail(email);
    const storedHash = user.password;
    const hash = (await scrypt(password, 'MySalt', 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new HttpException('bad password', HttpStatus.BAD_REQUEST);
    }
    return user;
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

    return this.userReposirory.save(updatedUser);
  }

  async remove(user: UserEntity) {
    const removedUser = await this.userReposirory.remove(user);
    return removedUser;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseDTO {
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
