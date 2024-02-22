import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this is to do not accept more data than you expected, eg. you ask for email and pass and somebody adds an ID, this will be cleaned/not received
    }),
  );
  await app.listen(3333);
}
bootstrap();
