import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.services'; 
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';


@UseGuards(AuthGuard())
@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  @ApiOperation({
    summary: 'Listar todoas as agendas',
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma Agenda',
  })
  findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar um novo produto',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(user, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uuma agenda pelo seu ID',
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(user, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma agenda pelo seu ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.productsService.delete(user, id);
  }
}

  
 