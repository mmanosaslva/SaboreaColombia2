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

  async create(dto: CreateRegionDto) {
    const region = this.regionRepo.create(dto);
    return this.regionRepo.save(region);
  }

  findAll() {
    return this.regionRepo.find();
  }

  async findOne(id: string) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Región no encontrada');
    return region;
  }

  async update(id: string, dto: UpdateRegionDto) {
    const region = await this.findOne(id);
    Object.assign(region, dto);
    return this.regionRepo.save(region);
  }

  async remove(id: string) {
    const region = await this.findOne(id);
    return this.regionRepo.remove(region);
  }
}