import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { RegionEntity } from '../../regiones/entities/region.entity';

@Entity('ciudad')
export class CiudadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'uuid' })
  regionId: string;

  @ManyToOne(() => RegionEntity, { eager: true, onDelete: 'CASCADE' })
  region: RegionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}