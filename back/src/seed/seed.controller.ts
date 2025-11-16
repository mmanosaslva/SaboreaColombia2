import { Controller, Post, Logger, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

/**
 * SeedController
 * Maneja endpoints para siembra de datos
 * 
 * Rutas:
 * - GET /api/seed/status → Estado del seed
 * - POST /api/seed → Ejecutar seed
 */
@Controller('seed')
// ↑ Sin el prefijo 'api' aquí, se agrega globalmente en main.ts
// Esto crea: POST /api/seed (no /api/api/seed)
export class SeedController {
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}

  /**
   * GET /api/seed/status
   * Ver estado del seed sin ejecutarlo
   */
  @Get('status')
  getStatus() {
    return {
      message: 'Seed disponible',
      endpoint: 'POST /api/seed',
      description: 'Ejecuta la siembra de datos de prueba',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * POST /api/seed
   * Ejecuta la siembra de todos los datos
   */
  @Post()
  async executeSeed() {
    this.logger.log('🌱 Iniciando siembra de datos desde endpoint...');
    
    try {
      await this.seedService.seed();
      
      this.logger.log('✅ Seed completado exitosamente');
      
      return {
        message: '🌱 Seed ejecutado exitosamente',
        data: {
          regiones: 5,
          ciudades: 10,
          platos: 15,
          restaurantes: 20,
          relaciones: 51,
        },
        timestamp: new Date().toISOString(),
        status: 'success',
      };
    } catch (error) {
      this.logger.error('❌ Error ejecutando seed:', error.message);
      
      return {
        message: '❌ Error ejecutando seed',
        error: error.message,
        timestamp: new Date().toISOString(),
        status: 'error',
      };
    }
  }
}