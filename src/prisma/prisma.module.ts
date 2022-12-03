import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { OrderController } from './order.controller';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], //NOVO CÓDIGO
})
export class PrismaModule {}