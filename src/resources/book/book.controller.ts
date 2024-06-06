import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { AuthorService } from '../author';
import { AuthGuard } from '@app/common/guards';
import { CreateBookDTO } from './dto/create-book.dto';
// import { BookEntity } from '@app/common/entities';
import { ICreateBook } from '@app/common/models';

@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Post()
  async create(@Body() createBookDTO: CreateBookDTO): Promise<ICreateBook> {
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
}
