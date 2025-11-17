import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './createciudad.dto';
import { UpdateCiudadDto } from './updatecuidad.dto';
import { CiudadEntity } from './ciudad.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller()
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

 
  @Get('ciudades')
  findAll(
    @Query('regionId') regionId?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.ciudadService.findAll(regionId, Number(limit) || 10, Number(offset) || 0);
  }


  @Get('ciudades/:id')
  findOne(@Param('id') id: string) {
    return this.ciudadService.findOne(id);
  }

  
  @Get('regiones/:regionId/ciudades')
  findByRegion(@Param('regionId') regionId: string) {
    return this.ciudadService.findByRegion(regionId);
  }

  
  @Post('ciudades')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateCiudadDto) {
    return this.ciudadService.create(dto);
  }

  
  @Patch('ciudades/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateCiudadDto) {
    return this.ciudadService.update(id, dto);
  }

  
  @Delete('ciudades/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.ciudadService.remove(id);
  }
}