import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  @MaxLength(500)
  imagenUrl?: string;
}