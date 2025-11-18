import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CiudadEntity} from 'src/ciudades/entities/ciudad.entity';
import { PlatoEntity } from 'src/platos/entities/plato.entity';

@Entity('region')
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagenUrl: string;

  //Cada Region puede tener muchas cuidades y muchos platos

  @OneToMany(() => CiudadEntity, ciudad => ciudad.region, { cascade: true, eager: true })
  ciudades: CiudadEntity[];

  @OneToMany(() => PlatoEntity, plato => plato.region, { cascade: true, eager: true })
  platos: PlatoEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}