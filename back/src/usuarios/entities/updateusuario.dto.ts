import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './createusuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}