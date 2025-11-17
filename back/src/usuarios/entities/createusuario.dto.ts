import {IsString,IsEmail,MaxLength,MinLength,IsEnum,IsBoolean,IsOptional,} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsEmail({}, { message: 'El email no es válido' })
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(255)
  contraseña: string;

  @IsEnum(['usuario', 'administrador'], {
    message: 'rol debe ser usuario o administrador',
  })
  @IsOptional()
  rol?: 'usuario' | 'administrador';

  @IsBoolean()
  @IsOptional() 
  activo?: boolean;
}