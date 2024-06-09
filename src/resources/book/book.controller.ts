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
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { AuthorService } from '../author';
import { AuthGuard } from '@app/common/guards';
import { CreateBookDTO, QueryDTO } from './dto/index';
// import { IBook } from '@app/common/models';
import { FindIdDTO } from '../user/dto';
import { BookEntity } from '@app/common/entities';
import { BooksResponse } from '@app/common/models';

@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Post()
  async create(@Body() createBookDTO: CreateBookDTO): Promise<BookEntity> {
    const authors = await this.authorService.findByName(
      createBookDTO.authorName,
    );

    if (!authors.length) {
      throw new HttpException('author not found', HttpStatus.NOT_FOUND);
    }
    const [author] = authors;

    if ((await this.bookService.findByTitle(createBookDTO.title)).length) {
      throw new HttpException('book already exists', HttpStatus.BAD_REQUEST);
    }

    const book = await this.bookService.create(createBookDTO, author);
    return book;
  }

  @Get('books')
  async findAllByAuthor(@Query() query: QueryDTO): Promise<BooksResponse> {
    const authors = await this.authorService.findByName(query.author);

    if (!authors.length) {
      throw new HttpException('author not found', HttpStatus.BAD_REQUEST);
    }

    const author = authors[0];
    return await this.bookService.findAll(query, author);
  }

  @Get('/:id')
  async findById(@Param() params: FindIdDTO): Promise<BookEntity> {
    const book = await this.bookService.findOne(+params.id);
    if (!book) {
      throw new HttpException('book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  @Put('/:id')
  async update(
    @Param() params: FindIdDTO,
    @Body() body: CreateBookDTO,
  ): Promise<BookEntity> {
    const book = await this.findById(params);
    const updatedBook = await this.bookService.update(book, body);
    return updatedBook;
  }

  @Delete('/:id')
  async remove(@Param() params: FindIdDTO): Promise<BookEntity> {
    const book = await this.findById(params);
    const removedBook = await this.bookService.remove(book);
    return removedBook;
  }
}
