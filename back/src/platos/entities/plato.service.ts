import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PlatoEntity } from './plato.entity';
import { CreatePlatoDto } from './createplato.dto';
import { UpdatePlatoDto } from './updateplato.dto';
import { RegionEntity } from 'src/regiones/entities/region.entity';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(PlatoEntity)
    private readonly platoRepo: Repository<PlatoEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepo: Repository<RegionEntity>,
  ) {}

  // Crear plato
  async create(dto: CreatePlatoDto) {
    const region = await this.regionRepo.findOne({ where: { id: dto.regionId } });
    if (!region) throw new NotFoundException('La región no existe');

    const plato = this.platoRepo.create(dto);
    return this.platoRepo.save(plato);
  }

  // Listar platos 
  async findAll(regionId?: string, nombre?: string, limit = 10, offset = 0) {
    const query = this.platoRepo.createQueryBuilder('plato')
      .leftJoinAndSelect('plato.region', 'region')
      .skip(offset)
      .take(limit);

    if (regionId) query.andWhere('plato.regionId = :regionId', { regionId });
    if (nombre) query.andWhere('plato.nombre ILIKE :nombre', { nombre: `%${nombre}%` });

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  // Obtener plato por ID
  async findOne(id: string) {
    const plato = await this.platoRepo.findOne({
      where: { id },
      relations: ['region'],
    });
    if (!plato) throw new NotFoundException('Plato no encontrado');
    return plato;
  }

  // Obtener platos por región
  async findByRegion(regionId: string) {
    const [data, total] = await this.platoRepo.findAndCount({
      where: { regionId },
      relations: ['region'],
    });
    if (data.length === 0) throw new NotFoundException('No hay platos para esta región');
    return { data, total, region: data[0]?.region.nombre };
  }

  // Buscar platos por nombre
  async search(termino: string) {
    const [data, total] = await this.platoRepo.findAndCount({
      where: { nombre: Like(`%${termino}%`) },
      relations: ['region'],
    });
    return { data, total, termino };
  }

  // Obtener solo historia e ingredientes
  async getHistoria(id: string) {
    const plato = await this.platoRepo.findOne({
      where: { id },
      select: ['id', 'nombre', 'historia', 'ingredientes', 'imagenUrl'],
    });
    if (!plato) throw new NotFoundException('Plato no encontrado');
    return plato;
  }

  // Actualizar plato
  async update(id: string, dto: UpdatePlatoDto) {
    const plato = await this.findOne(id);
    Object.assign(plato, dto);
    return this.platoRepo.save(plato);
  }

  // Eliminar plato
  async remove(id: string) {
    const plato = await this.findOne(id);
    await this.platoRepo.remove(plato);
    return { mensaje: 'Plato eliminado exitosamente' };
  }
}
