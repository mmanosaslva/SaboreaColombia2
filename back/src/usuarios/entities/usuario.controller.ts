import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './createusuario.dto';
import { UpdateUsuarioDto } from './updateusuario.dto';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto): Promise<UsuarioEntity> {
    return this.usuarioService.create(dto);
  }

  @Get()
  findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsuarioEntity> {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto): Promise<UsuarioEntity> {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuarioService.remove(id);
  }
}