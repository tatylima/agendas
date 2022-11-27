import { Controller, Get,Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService:ProductsService){}


  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create() {
    return this.productsService.create();
  }
}

