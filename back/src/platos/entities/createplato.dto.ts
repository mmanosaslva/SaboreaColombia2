import { IsString, IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class CreatePlatoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  historia: string;

  @IsString()
  @IsNotEmpty()
  ingredientes: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imagenUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  regionId: string;
}