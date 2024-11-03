import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { SeedService } from './seed/seed.service';
const start = async () => {
  const PORT = process.env.PORT || 7511;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Документация по серверу VOLTECH')
    .setDescription('Документация по роутам для VOLTECH')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const seeder = app.get(SeedService);
  await seeder.seed();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
