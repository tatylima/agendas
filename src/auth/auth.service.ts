import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if(!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const validHash = await bcrypt.compare(password /* SENHA DO DTO */, user.password /*SENHA DO BANCO  */ );

    if(validHash === false){
      throw new UnauthorizedException('Credenciais inválidas')
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    }
  }
}