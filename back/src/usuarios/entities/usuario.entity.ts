import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  contraseña: string;

  @Column({ type: 'enum', enum: ['usuario', 'administrador'], default: 'usuario' })
  rol: 'usuario' | 'administrador';

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
