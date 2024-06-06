import { AuthorEntity } from '@app/common/entities';

export interface ICreateBook {
  title: string;
  isbn: string;
  publishedDate: Date;
  author?: AuthorEntity;
}
