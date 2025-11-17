import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { CiudadesService } from './ciudad.service';
import { CreateCiudadDto } from './createciudad.dto';
import { UpdateCiudadDto } from './updatecuidad.dto';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Post()
  create(@Body() dto: CreateCiudadDto) {
    return this.ciudadesService.create(dto);
  }

  @Get()
  findAll() {
    return this.ciudadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCiudadDto) {
    return this.ciudadesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadesService.remove(id);
  }
}
