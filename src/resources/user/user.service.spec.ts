import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/common/entities';
import { UserController } from './user.controller';
import { IUser } from '@app/common/models';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<UserEntity>;
  const user = {
    id: 100,
    username: 'b',
    email: 'b@b.com',
    password: 'bbb',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as IUser;

  const body = {
    username: 'b',
    email: 'b@b.com',
    password: 'b',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('can create an istance of user servise', async () => {
    repo.create = jest.fn().mockImplementation(() => user);
    repo.save = jest.fn().mockImplementation(() => user);
    expect(await service.create(body)).toEqual(user);
  });
});
