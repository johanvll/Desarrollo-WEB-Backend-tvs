import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AccessLog } from './access-log.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AccessLog) private logRepo: Repository<AccessLog>,
    private jwtService: JwtService,
  ) {}

  validarPassword(password: string): string {
    if (password.length < 6) return 'débil';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%]/.test(password) && password.length >= 8)
      return 'fuerte';
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) return 'media';
    return 'débil';
  }

  async register(email: string, password: string) {
    const nivel = this.validarPassword(password);
    if (nivel === 'débil') throw new Error('Contraseña demasiado débil');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashed });
    await this.userRepo.save(user);
    return { message: 'Usuario creado', nivel };
  }

  async login(email: string, password: string, ip: string, browser: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    await this.logRepo.save({
      usuario: email,
      ip,
      evento: 'ingreso',
      browser,
      fecha: new Date().toISOString(),
    });

    return { token, role: user.role };
  }

  async logout(email: string, ip: string, browser: string) {
    await this.logRepo.save({
      usuario: email,
      ip,
      evento: 'salida',
      browser,
      fecha: new Date().toISOString(),
    });
    return { message: 'Logout registrado' };
  }
}