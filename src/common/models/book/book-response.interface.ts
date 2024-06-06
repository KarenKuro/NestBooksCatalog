import { AuthorEntity } from '@app/common/entities';

export interface IBookResponce {
  id: number;
  title: string;
  isbn: string;
  publishedDate: Date;
  author: AuthorEntity;
}
