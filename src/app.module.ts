import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthorModule, UserModule, BookModule } from '@resources/index';
import ormconfig from 'ormconfig';
import { AuthMiddleware } from './common/middlewares/index';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
