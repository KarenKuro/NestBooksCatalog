import { IBook } from '../book';

export interface IAuthor {
  id: number;
  name: string;
  biography: string;
  dateOfBirth: Date;
  books: IBook[];
  createdAt: Date;
  updatedAt: Date;
}
