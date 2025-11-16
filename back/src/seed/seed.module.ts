import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../regiones/entities/region.entity';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';
import { RestauranteEntity } from '../restaurantes/entities/restaurante.entity';
import { PlatoRestauranteEntity } from '../plato-restaurante/entities/plato-restaurante.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller'; // ← Agrega esta línea

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionEntity,
      CiudadEntity,
      PlatoEntity,
      RestauranteEntity,
      PlatoRestauranteEntity,
    ]),
  ],
  controllers: [SeedController], // ← Agrega el controlador aquí
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}