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
  LoginUserDTO,
  TokenResponseDTO,
  UserResponseDTO,
} from './dto/index';
import { UserService } from './user.service';
import { User } from '@app/common/decorators/user.decorator';
import { AuthGuard } from '@app/common/guards';
import { IUser } from '@app/common/models';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindIdDTO } from '@app/common/dtos';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: TokenResponseDTO })
  @ApiExtraModels(TokenResponseDTO)
  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<TokenResponseDTO> {
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

  @ApiOperation({ summary: 'Login to account' })
  @ApiResponse({ status: 201, type: TokenResponseDTO })
  @Post('signin')
  async signin(@Body() body: LoginUserDTO): Promise<TokenResponseDTO> {
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return current user' })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @UseGuards(AuthGuard)
  @Get('user')
  async currentUser(@User() user: IUser): Promise<UserResponseDTO> {
    return this.userService.findOne(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return current user by Id' })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @ApiExtraModels(FindIdDTO)
  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(
    @Param() params: FindIdDTO,
    @User('id') currentUserId: number,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.findOne(+params.id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    if (user.id !== currentUserId) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change current user property' })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Param() params: FindIdDTO,
    @Body() updateUserDto: UpdateUserDTO,
    @User('id') currentUserId: number,
  ): Promise<UserResponseDTO> {
    const user = await this.findById(params, currentUserId);
    const updatedUser = await this.userService.update(user, updateUserDto);
    return updatedUser;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user' })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(
    @Param() params: FindIdDTO,
    @User('id') currentUserId: number,
  ): Promise<UserResponseDTO> {
    const user = await this.findById(params, currentUserId);
    const removedUser = this.userService.remove(user);
    return removedUser;
  }
}
