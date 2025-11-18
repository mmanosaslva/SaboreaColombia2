import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PlatoRestauranteService } from './plato-restaurante.service';
import { CreatePlatoRestauranteDto } from './createplatorestaurante.dto';
import { UpdatePlatoRestauranteDto } from './updateplatorestaurante.dto';

@Controller('plato-restaurante')
export class PlatoRestauranteController {
  constructor(private readonly platoRestauranteService: PlatoRestauranteService) {}

  // 1. Crear relación plato-restaurante
  @Post()
  create(@Body() dto: CreatePlatoRestauranteDto) {
    return this.platoRestauranteService.create(dto);
  }

  // 2. Actualizar precio o disponibilidad
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlatoRestauranteDto) {
    return this.platoRestauranteService.update(id, dto);
  }

  // 3. Eliminar relación
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platoRestauranteService.remove(id);
  }

  // 4. Obtener platos de un restaurante con precio
  @Get('restaurante/:restauranteId/platos')
  findPlatosPorRestaurante(@Param('restauranteId') restauranteId: string) {
    return this.platoRestauranteService.findPlatosPorRestaurante(restauranteId);
  }
}