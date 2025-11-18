import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from './region.entity';
import { CreateRegionDto } from './createregion.dto';
import { UpdateRegionDto } from './updateregion.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepo: Repository<RegionEntity>,
  ) {}

  // Crea una nueva region
  async create(dto: CreateRegionDto) {
    const region = this.regionRepo.create(dto);
    return this.regionRepo.save(region);
  }

  async findAll(limit = 10, offset = 0) {
    const [data, total] = await this.regionRepo.findAndCount({
      skip: offset,
      take: limit,
    });
    return { data, total };
  }

  async findOne(id: string): Promise<RegionEntity> {
    const region = await this.regionRepo.findOne({
      where: { id },
      relations: ['ciudades', 'platos'],
    });
    if (!region) throw new NotFoundException('Región no encontrada');
    return region;
  }

  async update(id: string, dto: UpdateRegionDto): Promise<RegionEntity> {
    const region = await this.regionRepo.preload({ id, ...dto });
    if (!region) throw new NotFoundException('Región no encontrada');
    return this.regionRepo.save(region);
  }

  async remove(id: string) {
    const region = await this.findOne(id);
    await this.regionRepo.remove(region);
    return { mensaje: 'REGION eliminada exitosamente' };
  }
}