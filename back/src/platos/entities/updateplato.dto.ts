import { PartialType } from '@nestjs/swagger';
import { CreatePlatoDto } from './createplato.dto';

export class UpdatePlatoDto extends PartialType(CreatePlatoDto) {}