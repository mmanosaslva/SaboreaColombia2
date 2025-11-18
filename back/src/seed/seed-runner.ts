/**
 * seed-runner.ts
 * Script ejecutable para correr el seed
 * 
 * Ubicación: back/src/seed/seed-runner.ts
 * Ejecución: npm run seed
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function runSeed() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seed();
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

runSeed();