import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: { id: id },
      /* SELECIONAR O PERFIL E USUÁRIO "RESPONSÁVEL" */
      select: {
        name: true,
        image: true,
        user: {
          select: {
            name: true,
            isAdmin: true,
          },
        },
        /* EXIBIR OS PRODUTOS DESTE PERFIL, ASSIM COMO SEU RESPECTIVO CATEGORIAS */
        products: {
          select: {
            title: true,
            image: true,
            category: {
              select: {
                category: true,
              },
            },
          },
        },
        favorites: {
          select: {
            products: true,
          },
        },
      },
    });

    /* EXIBIR TODAS AS CATEGORIAS */
    const allCategory = await this.prisma.category.findMany({
      select: {
        category: true,
        products: {
          select: {
            title: true,
            image: true,
          },
        },
      },
    });
    return { profileData, allCategory };
  }
}