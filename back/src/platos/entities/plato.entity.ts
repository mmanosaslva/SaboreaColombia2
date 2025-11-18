import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { RegionEntity } from '../../regiones/entities/region.entity';

@Entity('plato')
export class PlatoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text' })
  historia: string;

  @Column({ type: 'text' })
  ingredientes: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagenUrl: string;

  @Column({ type: 'uuid' })
  regionId: string;

  @ManyToOne(() => RegionEntity, { eager: true, onDelete: 'CASCADE' })
  region: RegionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}