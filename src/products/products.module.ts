import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.services";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}