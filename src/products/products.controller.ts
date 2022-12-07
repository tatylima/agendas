import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.services'; 
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FavoriteproductDto } from '../favorites/dto/favorite.dto';
import { Favorites } from 'src/favorites/dto/entities/favorite-entity'; 
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'register new product. The category must be created before',
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product | void> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'list all products present in the database' })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search pruduct by id' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Get('favorite/:id')
  @ApiOperation({ summary: 'list of users who have favorited a product' })
  listUserslikedProduct(@Param('id') id: string) {
    return this.productsService.listUserslikedProduct(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update an product' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete a product' })
 
 delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('favorite')
  @ApiOperation({ summary: 'user favorite products' })
  favorite(@Body() favoriteproductDto: FavoriteproductDto): Promise<Favorites> {
    return this.productsService.favorite(favoriteproductDto);
  }

  @Delete('disfavor/:id')
  @ApiOperation({
    summary: 'disfavor, use the id generated when favoring the product',
  })
  disfavor(@Param('id') id: string) {
    return this.productsService.disfavor(id);
  }
}