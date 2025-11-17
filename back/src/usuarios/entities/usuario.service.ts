import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { CreateUsuarioDto } from './createusuario.dto';
import { UpdateUsuarioDto } from './updateusuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,
  ) {}

  // Crear usuario
  async create(dto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const existeEmail = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (existeEmail) throw new ConflictException('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.contraseña, 10);
    const usuario = this.usuarioRepo.create({ ...dto, contraseña: hashedPassword });
    return this.usuarioRepo.save(usuario);
  }

  // Listar todos
  findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioRepo.find();
  }

  // Buscar por ID
  async findOne(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  // Actualizar usuario
  async update(id: string, dto: UpdateUsuarioDto): Promise<UsuarioEntity> {
    const usuario = await this.findOne(id);

    if (dto.contraseña) {
      dto.contraseña = await bcrypt.hash(dto.contraseña, 10);
    }

    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  // Eliminar usuario
  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepo.remove(usuario);
  }
}