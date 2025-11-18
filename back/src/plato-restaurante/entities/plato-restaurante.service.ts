import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatoRestauranteEntity } from './plato-restaurante.entity';
import { CreatePlatoRestauranteDto } from './createplatorestaurante.dto';
import { UpdatePlatoRestauranteDto } from './updateplatorestaurante.dto';
import { PlatoEntity } from '../../platos/entities/plato.entity';
import { RestauranteEntity } from '../../restaurantes/entities/restaurante.entity';

@Injectable()
export class PlatoRestauranteService {
  constructor(
    @InjectRepository(PlatoRestauranteEntity)
    private readonly repo: Repository<PlatoRestauranteEntity>,

    @InjectRepository(PlatoEntity)
    private readonly platoRepo: Repository<PlatoEntity>,

    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepo: Repository<RestauranteEntity>,
  ) {}

  // POST - Asignar plato a restaurante
  async create(dto: CreatePlatoRestauranteDto) {
    const plato = await this.platoRepo.findOne({ where: { id: dto.platoId } });
    if (!plato) throw new NotFoundException('El plato no existe');

    const restaurante = await this.restauranteRepo.findOne({ where: { id: dto.restauranteId } });
    if (!restaurante) throw new NotFoundException('El restaurante no existe');

    const existe = await this.repo.findOne({
      where: { platoId: dto.platoId, restauranteId: dto.restauranteId },
    });

    if (existe) throw new ConflictException('Este plato ya está registrado en este restaurante');

    const entidad = this.repo.create(dto);
    return this.repo.save(entidad);
  }

  // PATCH - Actualizar precio o disponibilidad
  async update(id: string, dto: UpdatePlatoRestauranteDto) {
    const registro = await this.findOne(id);
    Object.assign(registro, dto);
    return this.repo.save(registro);
  }

  // GET por id
  async findOne(id: string) {
    const registro = await this.repo.findOne({
      where: { id },
      relations: ['plato', 'restaurante'],
    });

    if (!registro) throw new NotFoundException('Registro no encontrado');
    return registro;
  }

  // DELETE
  async remove(id: string) {
    const registro = await this.findOne(id);
    await this.repo.remove(registro);
    return { mensaje: 'Plato removido del restaurante exitosamente' };
  }

  // GET platos de un restaurante
  async findPlatosPorRestaurante(restauranteId: string) {

    const restaurante = await this.restauranteRepo.findOne({
      where: { id: restauranteId }
    });

    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');

    const [data, total] = await this.repo.findAndCount({
      where: { restauranteId },
      relations: ['plato'],
    });

    if (!total) throw new NotFoundException('Este restaurante no tiene platos registrados');

    return {
      data,
      total,
      restaurante: restaurante.nombre,
    };
  }
}