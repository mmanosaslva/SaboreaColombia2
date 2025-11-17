import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { CiudadEntity } from 'src/ciudades/entities/ciudad.entity';
import { CreateRestauranteDto } from './createrestaurante.dto';
import { UpdateRestauranteDto } from './updaterestaurante.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepo: Repository<RestauranteEntity>,
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepo: Repository<CiudadEntity>,
  ) {}

  // Crear restaurante
  async create(dto: CreateRestauranteDto): Promise<RestauranteEntity> {
    const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');

    const restaurante = this.restauranteRepo.create({ ...dto, ciudad });
    return this.restauranteRepo.save(restaurante);
  }

  // Listar todos los restaurantes
  findAll(): Promise<RestauranteEntity[]> {
    return this.restauranteRepo.find({ relations: ['ciudad'] });
  }

  // Buscar restaurante por ID
  async findOne(id: string): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepo.findOne({ where: { id }, relations: ['ciudad'] });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
    return restaurante;
  }

  // Actualizar restaurante
  async update(id: string, dto: UpdateRestauranteDto): Promise<RestauranteEntity> {
    const restaurante = await this.findOne(id);

    if (dto.ciudadId) {
      const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
      if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
      restaurante.ciudad = ciudad;
    }

    Object.assign(restaurante, dto);
    return this.restauranteRepo.save(restaurante);
  }

  // Eliminar restaurante
  async remove(id: string): Promise<void> {
    const restaurante = await this.findOne(id);
    await this.restauranteRepo.remove(restaurante);
  }
}