import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(dto: CreatePlatoDto) {
    const region = await this.regionRepo.findOne({ where: { id: dto.regionId } });
    if (!region) throw new NotFoundException('La región no existe');

    const nuevoPlato = this.platoRepo.create(dto);
    return this.platoRepo.save(nuevoPlato);
  }

  findAll() {
    return this.platoRepo.find();
  }

  async findOne(id: string) {
    const plato = await this.platoRepo.findOne({ where: { id } });
    if (!plato) throw new NotFoundException('Plato no encontrado');
    return plato;
  }

  async update(id: string, dto: UpdatePlatoDto) {
    const plato = await this.findOne(id);
    Object.assign(plato, dto);
    return this.platoRepo.save(plato);
  }

  async remove(id: string) {
    const plato = await this.findOne(id);
    return this.platoRepo.remove(plato);
  }
}