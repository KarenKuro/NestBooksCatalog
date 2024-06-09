import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthGuard } from '@app/common/guards';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { FindIdDTO } from '../user/dto';
import { IAuthor } from '@app/common/models';

@Controller('author')
@UseGuards(AuthGuard)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDTO: CreateAuthorDTO): Promise<IAuthor> {
    if ((await this.authorService.findByName(createAuthorDTO.name)).length) {
      throw new HttpException('author already exists', HttpStatus.BAD_REQUEST);
    }

    const author = await this.authorService.create(createAuthorDTO);
    return author;
  }

  @Get('/:id')
  async findById(@Param() params: FindIdDTO): Promise<IAuthor> {
    const author = await this.authorService.findOne(+params.id);
    if (!author) {
      throw new HttpException('author not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  @Put('/:id')
  async update(
    @Param() params: FindIdDTO,
    @Body() body: CreateAuthorDTO,
  ): Promise<IAuthor> {
    const author = await this.findById(params);
    const updatedAuthor = await this.authorService.update(author, body);
    return updatedAuthor;
  }

  @Delete('/:id')
  async remove(@Param() params: FindIdDTO): Promise<IAuthor> {
    const author = await this.findById(params);
    const removedAuthor = await this.authorService.remove(author);
    return removedAuthor;
  }
}
