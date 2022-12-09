import { Injectable,NotFoundException,UnauthorizedException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { Profile } from './entities/profile.entity';
import { createProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService{
    constructor(private readonly prisma:PrismaService){}
    }
    findAll(user:User){
        return this.prisma.profile.findMany({
            where:{
                userId:id,
            },
            include:{
                user:true,
                products: true,
                favorite:{
                    select:{
                        products:{
                            select:{
                                title:true,
                            },

                        },
                    },
                },
            },
        });
    }
    async findById(id:string){
    const record = await this.prisma.profile.findUnique({
        where:{id:id},
        include:{
            products:true,
        },
    }),
    if (!record) {
        throw new NotFoundException(`Registro com o ID: '${id}' não encontrado`);
      }
      return record;
    }
  
    async create(userId: string, dto: CreateProfileDto) {
      if (dto.gameId) {
        return await this.prisma.profile
          .create({
            data: {
              name: dto.name,
              image: dto.image,
              userId: dto.userId,
              products: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: {
              products: true,
              favorite: true,
            },
          })
          .catch(handleError);
      } else {
        return await this.prisma.profile
          .create({
            data: {
              name: dto.name,
              image: dto.image,
              userId: dto.userId,
            },
            include: {
              favorite: true,
            },
          })
          .catch(handleError);
      }
    }
  
    async update(userId: string, id: string, dto: UpdateProfileDto) {
      await this.findById(id);
      if (dto.productId) {
        return this.prisma.profile
          .update({
            where: { id },
            data: {
              name: dto.name,
              image: dto.image,
              userId: userId,
              favorite: {
                connect: {
                  id: dto.productId,
                },
              },
            },
            include: { favorite: true },
          })
          .catch(handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id },
            data: {
              name: dto.name,
              image: dto.image,
              userId: userId,
            },
            include: { favorite: true },
          })
          .catch(handleError);
      }
    }
  
    async delete(user: User, id: string) {
      if (user.isAdmin) {
        await this.findById(id);
        await this.prisma.profile.delete({ where: { id } });
      } else {
        throw new UnauthorizedException(
          'Usuário não autorizado. Contate o Administrador!',
        );
      }
    }
  }
    