import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto'; 
import { UpdateProductDto } from './dto/update-product.dto'; 
import { Product } from './entities/product.entity'; 
import { User } from 'src/users/entities/user.entity'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID: '${id}' não encontrado`);
    }
    return record;
  }

  async create(user: User, dto: CreateProductDto) {
    if (user.isAdmin) {
      const data: Prisma.ProductCreateInput = {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        year: dto.year,
        image: dto.image,
        category: {
          connect: {
          category:dto.categoryName,
          },
        },
      };
      return await this.prisma.product.create({
        data,
        include: {
          category: true,
        },
      });
    } else {
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
    }
  }

  async update(user: User, id: string, dto: UpdateProductDto) {
    if (user.isAdmin) {
      const productChosen = await this.findById(id);
      const data: Prisma.ProductUpdateInput = {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        year: dto.year,
        image: dto.image,
        genre: {
          disconnect: {
            category: productChosen.category[0].category,
          },
          connect: {
            category: dto.categoryName,
          },
        },
      };
      return this.prisma.product.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
    } else {
      throw new UnauthorizedException(
        'Usuário não autorizado. Contate o Administrador!',
      );
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
  
  