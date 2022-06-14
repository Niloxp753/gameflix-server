import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('GameFlix')
    .setDescription('Aplicação para uma plataforma online de jogos.')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('games')
    .addTag('genders')
    .addTag('user')
    .addTag('profile')
    .addTag('favorite')
    .addTag('homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3444);
}
bootstrap();
