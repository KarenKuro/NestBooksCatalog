import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateUserDTO,
  UpdateUserDTO,
  FindIDDTO,
  UserResponseDTO,
} from './dto/index';
import { UserService } from './user.service';
import { UserEntity } from '../../common/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserResponseDTO> {
    if ((await this.userService.findByEmail(createUserDto.email)).length) {
      throw new HttpException(
        'a user with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (await this.userService.findByUsername(createUserDto.username)).length
    ) {
      throw new HttpException(
        'a user with this username exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDTO): Promise<UserEntity> {
    const [user] = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return this.userService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findById(@Param() params: FindIDDTO): Promise<UserEntity> {
    const user = await this.userService.findOne(+params.id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch('/:id')
  async update(
    @Param() params: FindIDDTO,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.findById(params);
    const updatedUser = await this.userService.update(user, updateUserDto);
    return updatedUser;
  }

  @Delete('/:id')
  async remove(@Param() params: FindIDDTO): Promise<UserEntity> {
    const user = await this.findById(params);
    const removedUser = await this.userService.remove(user);
    return removedUser;
  }
}
