import { Module } from '@nestjs/common';
import { ProductService } from './products.services';
import { ProductController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // < NOVO IMPORT

@Module({
  imports: [PrismaModule], 
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}