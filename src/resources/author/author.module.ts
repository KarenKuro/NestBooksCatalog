import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../../common/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
