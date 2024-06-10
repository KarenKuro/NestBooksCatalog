import { BookEntity } from '@app/common/entities';
import { BooksResponse } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';

export class BooksResponseDTO implements BooksResponse {
  @ApiProperty({
    example: '[Book1, Book2]',
    description: 'Array of book',
  })
  books: BookEntity[];

  @ApiProperty({
    example: 10,
    description: 'Number of books by a particular author',
  })
  booksCount: number;
}
