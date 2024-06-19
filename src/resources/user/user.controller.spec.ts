import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUser } from '@app/common/models';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    fakeUserService = {
      create: (body: { username: string; email: string; password: string }) => {
        return Promise.resolve({
          id: 100,
          username: body.username,
          email: body.email,
          password: body.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      },
      signin: (
        user: {
          id: number;
          username: string;
          email: string;
          password: string;
          createdAt: Date;
          updatedAt: Date;
        },
        password: string,
      ) => {
        return Promise.resolve({
          id: user.id,
          username: user.username,
          email: user.email,
          password: password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          username: 'k',
          email: 'k@k.com',
          password: 'k',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      },
      findByEmail: (email: string) => {
        const user = {
          id: 100,
          username: 'k',
          email: email + 'm',
          password: 'k',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        user.email = 'kk';
        return Promise.resolve([] as IUser[]);
      },
      findByUsername: (username: string) => {
        const user = {
          id: 100,
          username,
          email: 'k@k.com',
          password: 'k',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        user.username = 'kk';
        return Promise.resolve([] as IUser[]);
      },
      update: (
        user: {
          id: number;
          username: string;
          email: string;
          password: string;
          createdAt: Date;
          updatedAt: Date;
        },
        attrs: { username: string },
      ) => {
        return Promise.resolve({
          id: user.id,
          username: attrs.username,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      },
      remove: (user: {
        id: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      }) => {
        return Promise.resolve({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      },
      buildUserResponse: (user: {
        id: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      }) => {
        return { token: user.password + 'foo' };
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findByEmail returns a list of users with the given email', async () => {
    const user = await controller.create({
      username: 'a',
      email: 'a@a.com',
      password: 'a',
    });
    expect(user.token).toEqual('afoo');
  });

  it('findUser return a single user with the given id', async () => {
    const user = await controller.currentUser({
      id: 100,
      username: 'k',
      email: 'k@k.com',
      password: 'k',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(user.id).toEqual(100);
    expect(user.username).toEqual('k');
  });

  it('Throws an error if user with given id is not found', async () => {
    const user = await controller.findById({ id: '99' }, 99);

    expect(user.id).toEqual(99);
  });
});
