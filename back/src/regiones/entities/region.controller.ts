import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './createregion.dto';
import { UpdateRegionDto } from './updateregion.dto';
import { RegionEntity } from './region.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('regiones')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  //Lista de Regiones
  @Get()
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.regionService.findAll(limit, offset);
  }

  // Obtener una region
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RegionEntity> {
    return this.regionService.findOne(id);
  }

  // Crear region (Solo Administrador)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateRegionDto): Promise<RegionEntity> {
    return this.regionService.create(dto);
  }

  //Actualizar region (Solo administracion)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateRegionDto): Promise<RegionEntity> {
    return this.regionService.update(id, dto);
  }
  
  //Eliminar region (Solo Administrador)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}