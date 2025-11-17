import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './createrestaurante.dto';
import { UpdateRestauranteDto } from './updaterestaurante.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller()
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Get('restaurantes')
  findAll(@Query('ciudadId') ciudadId?: string, @Query('nombre') nombre?: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.restauranteService.findAll(ciudadId, nombre, Number(limit) || 10, Number(offset) || 0);
  }



  @Get('ciudades/:ciudadId/restaurantes')
  findByCiudad(@Param('ciudadId') ciudadId: string) {
    return this.restauranteService.findByCiudad(ciudadId);
  }

  @Get('restaurantes/buscar/:termino')
  search(@Param('termino') termino: string) {
    return this.restauranteService.search(termino);
  }

  @Get('restaurantes/:id/platos')
  getPlatos(@Param('id') id: string) {
    return this.restauranteService.getPlatos(id);
  }

  @Post('restaurantes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateRestauranteDto) {
    return this.restauranteService.create(dto);
  }

  @Patch('restaurantes/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateRestauranteDto) {
    return this.restauranteService.update(id, dto);
  }

  @Delete('restaurantes/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.restauranteService.remove(id);
  }
}