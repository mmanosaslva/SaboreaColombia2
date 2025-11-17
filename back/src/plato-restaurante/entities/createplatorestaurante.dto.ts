import { IsUUID, IsNumber, IsPositive, IsBoolean } from 'class-validator';

export class CreatePlatoRestauranteDto {
  @IsUUID()
  platoId: string;

  @IsUUID()
  restauranteId: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsBoolean()
  disponible: boolean;
}