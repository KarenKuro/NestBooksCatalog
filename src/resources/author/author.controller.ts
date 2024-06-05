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
import { AuthorEntity } from '@app/common/entities';
import { FindIdDTO } from '../user/dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createAuthorDTO: CreateAuthorDTO,
  ): Promise<AuthorEntity> {
    if ((await this.authorService.findByName(createAuthorDTO.name)).length) {
      throw new HttpException('author already exists', HttpStatus.BAD_REQUEST);
    }

    const author = await this.authorService.create(createAuthorDTO);
    return author;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(@Param() params: FindIdDTO): Promise<AuthorEntity> {
    const author = await this.authorService.findOne(+params.id);
    if (!author) {
      throw new HttpException('author not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(
    @Param() params: FindIdDTO,
    @Body() updateAuthorDTO: CreateAuthorDTO,
  ): Promise<AuthorEntity> {
    const author = await this.findById(params);
    const updatedAuthor = await this.authorService.update(
      author,
      updateAuthorDTO,
    );
    return updatedAuthor;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async remove(@Param() params: FindIdDTO): Promise<AuthorEntity> {
    const author = await this.findById(params);
    const removedAuthor = this.authorService.remove(author);
    return removedAuthor;
  }
}
