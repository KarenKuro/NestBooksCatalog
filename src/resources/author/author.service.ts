import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from '@app/common/entities';
import { ICreateAuthor } from '@app/common/models';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(body: ICreateAuthor): Promise<AuthorEntity> {
    const author = this.authorRepository.create(body);
    return await this.authorRepository.save(author);
  }

  async findOne(id: number): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({ where: { id } });
    return author;
  }

  async findByName(name: string): Promise<AuthorEntity[]> {
    const authors = await this.authorRepository.findBy({ name });
    return authors;
  }

  async update(
    author: AuthorEntity,
    body: ICreateAuthor,
  ): Promise<AuthorEntity> {
    const updatedAuthor = Object.assign(author, body);
    return await this.authorRepository.save(updatedAuthor);
  }

  async remove(author: AuthorEntity): Promise<AuthorEntity> {
    const removedAuthor = await this.authorRepository.remove(author);
    return removedAuthor;
  }
}
