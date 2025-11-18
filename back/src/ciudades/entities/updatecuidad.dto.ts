import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadDto } from './createciudad.dto';


export class UpdateCiudadDto extends PartialType(CreateCiudadDto) {}