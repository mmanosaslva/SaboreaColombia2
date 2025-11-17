import {Controller,Get,Post,Patch,Delete,Param,Body,} from '@nestjs/common';
import { PlatoRestauranteService } from './plato-restaurante.service';
import { CreatePlatoRestauranteDto } from './createplatorestaurante.dto';
import { UpdatePlatoRestauranteDto } from './updateplatorestaurante.dto';

@Controller('plato-restaurante')
export class PlatoRestauranteController {
  constructor(private readonly platoRestauranteService: PlatoRestauranteService) {}

  @Post()
  create(@Body() dto: CreatePlatoRestauranteDto) {
    return this.platoRestauranteService.create(dto);
  }

  @Get()
  findAll() {
    return this.platoRestauranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platoRestauranteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlatoRestauranteDto) {
    return this.platoRestauranteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platoRestauranteService.remove(id);
  }
}