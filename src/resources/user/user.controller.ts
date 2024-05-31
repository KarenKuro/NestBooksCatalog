import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { UserEntity } from '../../common/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }
}
