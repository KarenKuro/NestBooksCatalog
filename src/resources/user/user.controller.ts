import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './index';
import { CreateUserDTO, UpdateUserDTO, FindIDDTO } from './dto/index';
import { UserEntity } from '../../common/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    if ((await this.userService.findByEmail(createUserDto.email)).length > 0) {
      throw new HttpException(
        'a user with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (await this.userService.findByUsername(createUserDto.username)).length > 0
    ) {
      throw new HttpException(
        'a user with this username exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(createUserDto);
    return user;
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
