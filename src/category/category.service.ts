import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique'; 
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity'; 


@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}


  findAll():Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findById(id: string) {
    const record = await this.prisma.category.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro com o ID: '${id}' não encontrado`);
    }
    return record;
  }

  async create(user: User, dto: CreateCategoryDto) {
    if (user.isAdmin) {
      const category: Category = { ...dto };
      return await this.prisma.category.create({ data: category});
    } else {
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
    }
  }

  async update(id: string, dto: UpdateCategoryDto, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      const data: Partial<Category> = { ...dto };
      return this.prisma.category
        .update({
          where: { id },
          data,
        })
        .catch(handleErrorUnique);
    } else {

    }
  }

  async delete(user: User, id: string) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.category.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
    }
  }
}