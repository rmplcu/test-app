/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  //Validation global pipe
  app.useGlobalPipes(new ValidationPipe()); //guarda validation declaration per elenco di cosa validare nei dto 

  //Global guards
  const reflector = new Reflector()
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  //Swagger config
  const config = new DocumentBuilder()
    .addCookieAuth()
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setTitle('Nestjs test app')
    .setDescription('My first nestjs app')
    .setVersion('1.0').build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const port = process.env.PORT || 4040;  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
