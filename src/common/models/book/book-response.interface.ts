import { IAuthor } from '../author';

export interface IBook {
  id: number;
  title: string;
  isbn: string;
  publishedDate: Date;
  author: IAuthor;
  createdAt: Date;
  updatedAt: Date;
}
