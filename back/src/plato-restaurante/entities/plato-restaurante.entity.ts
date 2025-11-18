import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';
import { PlatoEntity } from '../../platos/entities/plato.entity';
import { RestauranteEntity } from '../../restaurantes/entities/restaurante.entity';

@Entity('plato_restaurante')
@Unique(['platoId', 'restauranteId'])
export class PlatoRestauranteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  platoId: string;

  @Column({ type: 'uuid' })
  restauranteId: string;

  @ManyToOne(() => PlatoEntity, { eager: true, onDelete: 'CASCADE' })
  plato: PlatoEntity;

  @ManyToOne(() => RestauranteEntity, { eager: true, onDelete: 'CASCADE' })
  restaurante: RestauranteEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}