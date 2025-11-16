import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  // Transforma @Controller('seed') → GET /api/seed
  app.setGlobalPrefix('api');

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Elimina propiedades no definidas
      forbidNonWhitelisted: true, // Rechaza si hay props no definidas
      transform: true,        // Transforma types automáticamente
    }),
  );

  // CORS habilitado 
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Saborea Colombia API              ║
║  📍 http://localhost:${port}           ║
║  📚 http://localhost:${port}/api/docs  ║
╚════════════════════════════════════════╝
  `);
}

bootstrap();