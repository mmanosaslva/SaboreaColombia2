import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './createplato.dto';
import { UpdatePlatoDto } from './updateplato.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller()
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  
  @Get('platos')
  findAll(
    @Query('regionId') regionId?: string,
    @Query('nombre') nombre?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.platoService.findAll(regionId, nombre, Number(limit) || 10, Number(offset) || 0);
  }

  
  @Get('platos/:id')
  findOne(@Param('id') id: string) {
    return this.platoService.findOne(id);
  }

  
  @Get('regiones/:regionId/platos')
  findByRegion(@Param('regionId') regionId: string) {
    return this.platoService.findByRegion(regionId);
  }

  
  @Get('platos/buscar/:termino')
  search(@Param('termino') termino: string) {
    return this.platoService.search(termino);
  }

  
  @Get('platos/:id/historia')
  getHistoria(@Param('id') id: string) {
    return this.platoService.getHistoria(id);
  }

  
  @Post('platos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreatePlatoDto) {
    return this.platoService.create(dto);
  }

  @Patch('platos/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdatePlatoDto) {
    return this.platoService.update(id, dto);
  }

  
  @Delete('platos/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.platoService.remove(id);
  }
}