import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useStaticAssets(join('public'));
  app.setBaseViewsDir(join('views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()