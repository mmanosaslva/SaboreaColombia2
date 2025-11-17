
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { RestauranteEntity } from './restaurante.entity';
import { CiudadEntity } from 'src/ciudades/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity, CiudadEntity])],
  providers: [RestauranteService],
  controllers: [RestauranteController],
})
export class RestauranteModule {}
