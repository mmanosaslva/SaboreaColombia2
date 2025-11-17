import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'passwordSeguro123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'María García' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiProperty({ example: 'usuario', required: false })
  @IsOptional()
  @IsIn(['usuario', 'admin'])
  rol?: string = 'usuario';
}