import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthorEntity, BookEntity } from '../../common/entities/index';
import { AuthorService } from '../author';
import { AuthGuard } from '@app/common/guards';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BookController],
  providers: [BookService, AuthorService, AuthGuard],
})
export class BookModule {}
