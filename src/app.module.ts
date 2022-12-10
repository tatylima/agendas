import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoryModule,
    OrderModule,
    AuthModule,
    ProfilesModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}