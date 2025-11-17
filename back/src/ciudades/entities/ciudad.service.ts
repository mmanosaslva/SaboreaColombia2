import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';
import { CreateCiudadDto } from './createciudad.dto';
import { UpdateCiudadDto } from './updatecuidad.dto';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,
  ) {}

  create(dto: CreateCiudadDto) {
    const ciudad = this.ciudadRepository.create(dto);
    return this.ciudadRepository.save(ciudad);
  }

  findAll() {
    return this.ciudadRepository.find();
  }

  async findOne(id: string) {
    const ciudad = await this.ciudadRepository.findOne({ where: { id } });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    return ciudad;
  }

  async update(id: string, dto: UpdateCiudadDto) {
    const ciudad = await this.findOne(id);
    Object.assign(ciudad, dto);
    return this.ciudadRepository.save(ciudad);
  }

  async remove(id: string) {
    const ciudad = await this.findOne(id);
    await this.ciudadRepository.remove(ciudad);
    return { message: 'Ciudad eliminada correctamente' };
  }
}