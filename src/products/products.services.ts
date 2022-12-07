import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity'; 
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteproductDto } from '../favorites/dto/favorite.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Favorites } from 'src/favorites/dto/entities/favorite-entity'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    const newProduct = await this.prisma.product
      .create({ data: createProductDto })
      .catch(handleErrorUnique);

    return newProduct;
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async verifyIdandReturnProduct(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return product;
  }

  findOne(id: string) {
    return this.verifyIdandReturnProduct(id);
  }

  async listUserslikedProduct(id: string) {
    const product: Product = await this.verifyIdandReturnProduct(id);

    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        id: true,
        productName: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch(handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product.delete({
      where: { id },
      select: { name: true, description: true },
    });
  }

  async favorite(favoriteproductDto: FavoriteproductDto): Promise<Favorites> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: favoriteproductDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `user ${favoriteproductDto.userId} not found`,
      );
    }

    const productName: Product = await this.prisma.product.findUnique({
      where: { name: favoriteproductDto.productName },
    });

    if (!productName) {
      throw new NotFoundException(
        `product ${favoriteproductDto.productName} not found`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: { id: favoriteproductDto.userId },
      },
      product: {
        connect: { name: favoriteproductDto.productName },
      },
    };

    return this.prisma.favorite.create({ data });
  }

  async disfavor(id: string) {
    const favorite: Favorites = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return this.prisma.favorite.delete({ where: { id } });
  }
}