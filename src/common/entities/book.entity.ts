import { Column, Entity, ManyToOne } from 'typeorm';
import { AuthorEntity } from './index';
import { BaseEntity } from './base/index';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  publishedDate: Date;

  @ManyToOne(() => AuthorEntity, (author) => author.id)
  author: AuthorEntity;
}
