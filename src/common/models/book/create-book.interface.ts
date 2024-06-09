import { IAuthor } from '../author';

export interface ICreateBook {
  title: string;
  isbn: string;
  publishedDate: Date;
  author?: IAuthor;
}
