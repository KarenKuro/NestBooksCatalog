import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuthorEntity, BookEntity } from '@app/common/entities';
import { BooksResponse, IBook, ICreateBook } from '@app/common/models';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(body: ICreateBook, author: AuthorEntity): Promise<BookEntity> {
    const book = body;
    book.author = author;
    const createdBook = this.bookRepository.create(book);

    return await this.bookRepository.save(createdBook);
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return book;
  }

  async findByTitle(title: string): Promise<BookEntity[]> {
    const books = await this.bookRepository.findBy({ title });
    return books;
  }

  async update(book: IBook, body: ICreateBook): Promise<BookEntity> {
    const updatedBook = Object.assign(book, body);
    return await this.bookRepository.save(updatedBook);
  }

  async remove(book: IBook): Promise<BookEntity> {
    const removedBook = await this.bookRepository.remove(book);
    return removedBook;
  }

  async findAll(query: any): Promise<BooksResponse> {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('books')
      .leftJoinAndSelect('books.author', 'author');

    queryBuilder.orderBy('books.id', 'DESC');

    const booksCount = await queryBuilder.getCount();

    if (query.author) {
      const author = await this.authorRepository.findOneBy({
        name: query.author,
      });

      queryBuilder.andWhere('books.authorId = :id', { id: author.id });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const books = await queryBuilder.getMany();
    return { books: books, booksCount };
  }
}
