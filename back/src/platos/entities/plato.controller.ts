import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './createplato.dto';
import { UpdatePlatoDto } from './updateplato.dto';

@Controller('platos')
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  create(@Body() dto: CreatePlatoDto) {
    return this.platoService.create(dto);
  }

  @Get()
  findAll() {
    return this.platoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlatoDto) {
    return this.platoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platoService.remove(id);
  }
}