import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module'; 
import { CategoryModule } from './category/category.module'; 
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profiles/profile.module'; 
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [
    ProductsModule,
    CategoryModule,
    PrismaModule,
    UsersModule,
    ProfileModule,
    AuthModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}