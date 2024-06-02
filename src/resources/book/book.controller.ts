import { Controller, Get } from '@nestjs/common';
import { BookService } from './index';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getHi(): string {
    return this.bookService.getHi();
  }
}
