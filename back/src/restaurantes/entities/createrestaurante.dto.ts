import {IsString, IsOptional, MaxLength, IsUUID,IsUrl,} from 'class-validator';

export class CreateRestauranteDto {
  @IsString()
  @MaxLength(150)
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  @MaxLength(255)
  direccion: string;

  @IsString()
  @MaxLength(20)
  telefono: string;

  @IsOptional()
  @IsUrl({}, { message: 'imagenUrl debe ser una URL válida' })
  @MaxLength(500)
  imagenUrl?: string;

  @IsString()
  @MaxLength(100)
  horario: string;

  @IsUUID()
  ciudadId: string;
}