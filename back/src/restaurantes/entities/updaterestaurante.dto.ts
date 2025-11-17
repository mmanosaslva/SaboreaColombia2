import { PartialType } from '@nestjs/mapped-types';
import { CreateRestauranteDto } from './createrestaurante.dto';

export class UpdateRestauranteDto extends PartialType(CreateRestauranteDto) {}