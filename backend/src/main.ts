import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies if needed
  });
  await app.listen( 5000);
}
bootstrap();
