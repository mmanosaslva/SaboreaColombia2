import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string; usuario: any }> {
    const { email, password, nombre, rol } = registerDto;

    // Verificar si el usuario ya existe
    const existeUsuario = await this.usuarioRepository.findOne({ where: { email } });
    if (existeUsuario) {
      throw new ConflictException('El usuario con este email ya existe');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = this.usuarioRepository.create({
      email,
      password: hashedPassword,
      nombre,
      rol: rol || 'usuario',
    });

    await this.usuarioRepository.save(usuario);

    // Generar JWT
    const token = this.jwtService.sign({ 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    });

    // Excluir password del response
    const { password: _, ...usuarioSinPassword } = usuario;

    return { token, usuario: usuarioSinPassword };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; usuario: any }> {
    const { email, password } = loginDto;

    // Buscar usuario
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Validar password
    const esPasswordValido = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT
    const token = this.jwtService.sign({ 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    });

    // Excluir password del response
    const { password: _, ...usuarioSinPassword } = usuario;

    return { token, usuario: usuarioSinPassword };
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Logout exitoso. En una implementación real, podrías invalidar el token.' };
  }
}