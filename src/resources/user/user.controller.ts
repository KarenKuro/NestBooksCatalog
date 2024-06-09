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
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDTO,
  UpdateUserDTO,
  FindIdDTO,
  UserResponseDTO,
  LoginUserDTO,
} from './dto/index';
import { UserService } from './user.service';
import { User } from '@app/common/decorators/user.decorator';
import { AuthGuard } from '@app/common/guards';
import { IUser } from '@app/common/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserResponseDTO> {
    if ((await this.userService.findByEmail(createUserDto.email)).length) {
      throw new HttpException(
        'user with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (await this.userService.findByUsername(createUserDto.username)).length
    ) {
      throw new HttpException(
        'user with this username exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('signin')
  async signin(@Body() body: LoginUserDTO): Promise<UserResponseDTO> {
    const [user] = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const authUser = await this.userService.signin(user, body.password);

    if (authUser === null) {
      throw new HttpException('bad password', HttpStatus.BAD_REQUEST);
    }

    return this.userService.buildUserResponse(authUser);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: IUser): Promise<IUser> {
    //Promise<UserResponseDTO> {
    // return this.userService.buildUserResponse(user);
    return this.userService.findOne(user.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(
    @Param() params: FindIdDTO,
    @User('id') currentUserId: number,
  ): Promise<IUser> {
    const user = await this.userService.findOne(+params.id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    if (user.id !== currentUserId) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async update(
    @Param() params: FindIdDTO,
    @Body() updateUserDto: UpdateUserDTO,
    @User('id') currentUserId: number,
  ): Promise<IUser> {
    const user = await this.findById(params, currentUserId);
    const updatedUser = await this.userService.update(user, updateUserDto);
    return updatedUser;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async remove(
    @Param() params: FindIdDTO,
    @User('id') currentUserId: number,
  ): Promise<IUser> {
    const user = await this.findById(params, currentUserId);
    const removedUser = this.userService.remove(user);
    return removedUser;
  }
}
