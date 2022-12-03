import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error'; 
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | void> {
    const newCategory = await this.prisma.category
      .create({ data: createCategoryDto })
      .catch(handleErrorUnique);

    return newCategory;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async verifyIdandReturnCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return category;
  }

  findOne(id: string): Promise<Category> {
    return this.verifyIdandReturnCategory(id);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | void> {
    await this.verifyIdandReturnCategory(id);

    return this.prisma.category
      .update({
        where: { id },
        data: updateCategoryDto,
      })
      .catch(handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyIdandReturnCategory(id);

    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}