import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../regiones/entities/region.entity';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';
import { RestauranteEntity } from '../restaurantes/entities/restaurante.entity';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionEntity,
      CiudadEntity,
      PlatoEntity,
      RestauranteEntity,
      UsuarioEntity,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}