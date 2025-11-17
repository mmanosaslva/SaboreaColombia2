import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoEntity } from './plato.entity';
import { PlatoService } from './plato.service';
import { PlatoController } from './plato.controller';
import { RegionEntity } from 'src/regiones/entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatoEntity, RegionEntity])],
  controllers: [PlatoController],
  providers: [PlatoService],
  exports: [PlatoService], // si otro módulo necesita usarlo
})
export class PlatoModule {}