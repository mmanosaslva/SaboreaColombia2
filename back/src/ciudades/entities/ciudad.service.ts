import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';
import { CreateCiudadDto } from './createciudad.dto';
import { UpdateCiudadDto } from './updatecuidad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepo: Repository<CiudadEntity>,
  ) {}

  // Crear ciudad
  async create(dto: CreateCiudadDto) {
    const ciudad = this.ciudadRepo.create(dto);
    return this.ciudadRepo.save(ciudad);
  }

  
  async findAll(regionId?: string, limit = 10, offset = 0) {
    const query = this.ciudadRepo.createQueryBuilder('ciudad')
      .leftJoinAndSelect('ciudad.region', 'region')
      .leftJoinAndSelect('ciudad.restaurantes', 'restaurantes')
      .skip(offset)
      .take(limit);

    if (regionId) {
      query.where('ciudad.regionId = :regionId', { regionId });
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  // Obtener ciudad por ID 
  async findOne(id: string) {
    const ciudad = await this.ciudadRepo.findOne({
      where: { id },
      relations: ['region', 'restaurantes'],
    });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    return ciudad;
  }

  // Obtener ciudades por región
  async findByRegion(regionId: string) {
    const [data, total] = await this.ciudadRepo.findAndCount({
      where: { regionId },
      relations: ['region'],
    });
    if (data.length === 0) throw new NotFoundException('No hay ciudades para esta región');
    return { data, total, region: data[0].region.nombre };
  }

  // Actualizar ciudad
  async update(id: string, dto: UpdateCiudadDto) {
    const ciudad = await this.ciudadRepo.preload({ id, ...dto });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    return this.ciudadRepo.save(ciudad);
  }

  // Eliminar ciudad
  async remove(id: string) {
    const ciudad = await this.findOne(id);
    await this.ciudadRepo.remove(ciudad);
    return { mensaje: 'Ciudad eliminada exitosamente' };
  }
}