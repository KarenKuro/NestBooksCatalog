import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { BookModule } from '@app/resources/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { AuthorModule, UserModule } from '@resources/index';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    BookModule,
    AuthorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
