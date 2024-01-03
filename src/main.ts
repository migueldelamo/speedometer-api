import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // SWAGGER config
  const config = new DocumentBuilder()
    .setTitle('Nombre de tu API')
    .setDescription('Descripción de tu API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  // HELMET
  app.use(helmet());

  // ROUTES GLOBAL PREFIX
  app.setGlobalPrefix('api/v1');
  // PUBLIC FILES
  app.useStaticAssets(join(__dirname, '..', '../public'));

  await app.listen(process.env.APP_PORT);
}
bootstrap();
