import { PartialType } from '@nestjs/swagger';
import { CreatePlatoRestauranteDto } from './createplatorestaurante.dto';

export class UpdatePlatoRestauranteDto extends PartialType(CreatePlatoRestauranteDto) {}