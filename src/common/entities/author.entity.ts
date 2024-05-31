import { BookEntity } from './';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'authors' })
export class AuthorEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  biography: string;

  @Column()
  dateOfBirth: Date;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
