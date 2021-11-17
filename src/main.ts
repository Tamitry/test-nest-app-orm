import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = NestFactory.create(AppModule);
  console.log(`PORT: ${PORT}`);

  const config = new DocumentBuilder()
    .setTitle('Урок по продвинотому BACKEND')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Dima')
    .build();

  const document = SwaggerModule.createDocument(await app, config);
  SwaggerModule.setup('/api/docs', await app, document);

  (await app).listen(PORT, () => console.log(`Server has been deployed on ${PORT} port.`))
}

start();