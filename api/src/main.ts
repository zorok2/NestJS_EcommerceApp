/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { FirebaseService } from './shared/file-upload/firebase/firebase.service';
import { CONFIG_SWAGGER } from './constant';
import { ValidationPipe } from '@nestjs/common';
import { Server, createServer } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const firebaseService = app.get(FirebaseService);
  firebaseService.initFirebase();

  const document = SwaggerModule.createDocument(app, CONFIG_SWAGGER);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  const httpServer = createServer();
  const io = new Server(httpServer);
}
bootstrap();
