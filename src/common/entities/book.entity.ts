import { Column, Entity, ManyToOne } from 'typeorm';
import { AuthorEntity } from './';
import { BaseEntity } from './base';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  isbn: number;

  @Column({ type: 'date' })
  publishedDate: Date;

  @ManyToOne(() => AuthorEntity, (author) => author.id)
  author: AuthorEntity;
}
