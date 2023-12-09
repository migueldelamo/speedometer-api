import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGGER config
  const config = new DocumentBuilder()
    .setTitle('Nombre de tu API')
    .setDescription('Descripción de tu API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  // ROUTES GLOBAL PREFIX
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
