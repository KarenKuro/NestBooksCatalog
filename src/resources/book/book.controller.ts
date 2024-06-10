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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/common/guards';
import { BookService } from './book.service';
import { AuthorService } from '../author';
import {
  BooksResponseDTO,
  CreateBookDTO,
  QueryDTO,
  BookResponseDTO,
} from './dto/index';
import { FindIdDTO } from '../user/dto';

@ApiBearerAuth()
@ApiTags('Book')
@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @ApiOperation({ summary: 'Create new book' })
  @ApiResponse({ status: 201, type: BookResponseDTO })
  @Post()
  async create(@Body() createBookDTO: CreateBookDTO): Promise<BookResponseDTO> {
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

  @ApiOperation({ summary: 'Return array of books, and count' })
  @ApiResponse({ status: 200, type: BooksResponseDTO })
  @ApiExtraModels(QueryDTO)
  @Get('books')
  async findAllByAuthor(@Query() query: QueryDTO): Promise<BooksResponseDTO> {
    const authors = await this.authorService.findByName(query.author);

    if (!authors.length) {
      throw new HttpException('author not found', HttpStatus.BAD_REQUEST);
    }

    const author = authors[0];
    return await this.bookService.findAll(query, author);
  }

  @ApiOperation({ summary: 'Return book by Id' })
  @ApiResponse({ status: 200, type: BookResponseDTO })
  @Get('/:id')
  async findById(@Param() params: FindIdDTO): Promise<BookResponseDTO> {
    const book = await this.bookService.findOne(+params.id);
    if (!book) {
      throw new HttpException('book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  @ApiOperation({ summary: 'Change book property' })
  @ApiResponse({ status: 200, type: BookResponseDTO })
  @Put('/:id')
  async update(
    @Param() params: FindIdDTO,
    @Body() body: CreateBookDTO,
  ): Promise<BookResponseDTO> {
    const book = await this.findById(params);
    const updatedBook = await this.bookService.update(book, body);
    return updatedBook;
  }

  @ApiOperation({ summary: 'Delete book by Id' })
  @ApiResponse({ status: 200, type: BookResponseDTO })
  @Delete('/:id')
  async remove(@Param() params: FindIdDTO): Promise<BookResponseDTO> {
    const book = await this.findById(params);
    const removedBook = await this.bookService.remove(book);
    return removedBook;
  }
}
