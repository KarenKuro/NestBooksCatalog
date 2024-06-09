import { BookEntity } from '@app/common/entities';

export interface BooksResponse {
  books: BookEntity[];
  booksCount: number;
}
