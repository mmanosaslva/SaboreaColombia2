import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './createrestaurante.dto';
import { UpdateRestauranteDto } from './updaterestaurante.dto';
import { RestauranteEntity } from './restaurante.entity';

@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  create(@Body() dto: CreateRestauranteDto): Promise<RestauranteEntity> {
    return this.restauranteService.create(dto);
  }

  @Get()
  findAll(): Promise<RestauranteEntity[]> {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RestauranteEntity> {
    return this.restauranteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRestauranteDto): Promise<RestauranteEntity> {
    return this.restauranteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.restauranteService.remove(id);
  }
}