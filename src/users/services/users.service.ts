import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '../dto/update-user.dto'; 
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { User } from '../entities/user.entity'; 
import { Favorites } from 'src/favorites/dto/entities/favorite-entity'; 

@Injectable()
export class UsersService {
  private userDataSelection = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreatUserDto): Promise<User | void> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const data: CreatUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const newUser = await this.prisma.user
      .create({ data, select: this.userDataSelection })
      .catch(handleErrorUnique);

    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: { ...this.userDataSelection, favorites: true },
    });
  }

  async verifyIdandReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: { ...this.userDataSelection, favorites: true },
    });

    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return user;
  }

  findOne(id: string) {
    return this.verifyIdandReturnUser(id);
  }

  async listFavoritesProducts(id: string): Promise<Favorites[]> {
    await this.verifyIdandReturnUser(id);

    return this.prisma.favorite.findMany({
      where: { userId: id },
      select: { productName: true },
    });
  }

  async update(id: string, updateUserdto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user
      .update({
        where: { id },
        data: updateUserdto,
        select: this.userDataSelection,
      })
      .catch(handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: this.userDataSelection,
    });
  }
}