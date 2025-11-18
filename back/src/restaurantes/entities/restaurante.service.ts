import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { CiudadEntity } from 'src/ciudades/entities/ciudad.entity';
import { PlatoEntity } from 'src/platos/entities/plato.entity';
import { CreateRestauranteDto } from './createrestaurante.dto';
import { UpdateRestauranteDto } from './updaterestaurante.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepo: Repository<RestauranteEntity>,
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepo: Repository<CiudadEntity>,
    @InjectRepository(PlatoEntity)
    private readonly platoRepo: Repository<PlatoEntity>,
  ) {}

  async create(dto: CreateRestauranteDto) {
    const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');

    const restaurante = this.restauranteRepo.create({ ...dto, ciudad });
    return this.restauranteRepo.save(restaurante);
  }

  async findAll(ciudadId?: string, nombre?: string, limit = 10, offset = 0) {
    const query = this.restauranteRepo.createQueryBuilder('restaurante')
      .leftJoinAndSelect('restaurante.ciudad', 'ciudad')
      .leftJoinAndSelect('ciudad.region', 'region')
      .skip(offset)
      .take(limit);

    if (ciudadId) query.andWhere('restaurante.ciudadId = :ciudadId', { ciudadId });
    if (nombre) query.andWhere('restaurante.nombre ILIKE :nombre', { nombre: `%${nombre}%` });

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async findOne(id: string) {
    const restaurante = await this.restauranteRepo.findOne({ where: { id }, relations: ['ciudad', 'ciudad.region'] });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
    return restaurante;
  }

  async findByCiudad(ciudadId: string) {
    const [data, total] = await this.restauranteRepo.findAndCount({ where: { ciudadId } });
    if (!data.length) throw new NotFoundException('No hay restaurantes para esta ciudad');

    const ciudad = await this.ciudadRepo.findOne({ where: { id: ciudadId } });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    return { data, total, ciudad: ciudad!.nombre };
  }

  async search(termino: string) {
    const [data, total] = await this.restauranteRepo.findAndCount({
      where: { nombre: Like(`%${termino}%`) },
      relations: ['ciudad'],
    });
    return { data, total, termino };
  }

  async getPlatos(restauranteId: string) {
    const restaurante = await this.restauranteRepo.findOne({ where: { id: restauranteId } });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');

  }

  async update(id: string, dto: UpdateRestauranteDto) {
    const restaurante = await this.restauranteRepo.findOne({ where: { id } });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');

    if (dto.ciudadId) {
      const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
      if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
      restaurante.ciudad = ciudad;
    }

    Object.assign(restaurante, dto);
    return this.restauranteRepo.save(restaurante);
  }

  async remove(id: string) {
    const restaurante = await this.restauranteRepo.findOne({ where: { id } });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
    await this.restauranteRepo.remove(restaurante);
    return { mensaje: 'Restaurante eliminado exitosamente' };
  }
}