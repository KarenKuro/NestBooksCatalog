import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuthorEntity, BookEntity } from '@app/common/entities';
import { ICreateBook } from '@app/common/models';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(body: ICreateBook, author: AuthorEntity): Promise<ICreateBook> {
    const book = body;
    book.author = author;
    const createdBook = this.bookRepository.create(book);

    return await this.bookRepository.save(createdBook);
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });
    return book;
  }

  async findByTitle(title: string): Promise<BookEntity[]> {
    const books = await this.bookRepository.findBy({ title });
    return books;
  }

  async updete(book: BookEntity, body: ICreateBook): Promise<BookEntity> {
    const updatedBook = Object.assign(book, body);
    return await this.bookRepository.save(updatedBook);
  }

  async remove(book: BookEntity): Promise<BookEntity> {
    const removedBook = await this.bookRepository.remove(book);
    return removedBook;
  }
}
