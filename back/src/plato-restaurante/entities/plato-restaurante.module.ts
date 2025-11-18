import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoRestauranteEntity } from './plato-restaurante.entity';
import { PlatoRestauranteService } from './plato-restaurante.service';
import { PlatoRestauranteController } from './plato-restaurante.controller';
import { PlatoEntity } from 'src/platos/entities/plato.entity';
import { RestauranteEntity } from 'src/restaurantes/entities/restaurante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlatoRestauranteEntity,
      PlatoEntity,
      RestauranteEntity,
    ]),
  ],
  controllers: [PlatoRestauranteController],
  providers: [PlatoRestauranteService],
})
export class PlatoRestauranteModule {}