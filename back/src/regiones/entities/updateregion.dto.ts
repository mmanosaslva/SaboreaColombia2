import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './createregion.dto';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {}