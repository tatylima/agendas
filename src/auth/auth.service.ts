import { Injectable, NotFoundException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  userValidation(data: User | boolean) {
    if (!data) {
      throw new NotFoundException('Invalid email or password');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user: User = await this.prisma.user.findUnique({ where: { email } });

    this.userValidation(user);

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    this.userValidation(passwordMatch);

    delete user.password;

    const token: string = this.jwtService.sign({ email, id: user.id });

    return { token, user };
  }
}