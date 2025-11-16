import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CiudadEntity } from '../../ciudades/entities/ciudad.entity';

@Entity('restaurante')
export class RestauranteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagenUrl: string;

  @Column({ type: 'varchar', length: 100 })
  horario: string;

  @Column({ type: 'uuid' })
  ciudadId: string;

  @ManyToOne(() => CiudadEntity, { eager: true, onDelete: 'CASCADE' })
  ciudad: CiudadEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}