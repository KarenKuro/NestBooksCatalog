if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //фильтрует входящие данные и убирает из body все лишние поля
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // все выходные данные, возвращаемые контроллерами,
  // автоматически проходили через ClassSerializerInterceptor(декоратор @Exclude())

  const config = new DocumentBuilder()
    .setTitle('Books Catalog')
    .setDescription(
      `This documentation provides detailed information, endpoints, request and response formats, 
      authentication methods, and usage guidelines necessary for seamless integration.`,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
