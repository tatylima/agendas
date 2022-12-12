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
import { CreateCategoryDto } from './dto/create-category.dto'; 
import { UpdateCategoryDto } from './dto/update-category.dto';  
import { CategoryService } from './category.service'; 
import { ApiBearerAuth,  ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity'; 
import { User } from 'src/users/entities/user.entity'; 
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('category')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService:CategoryService ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar um nova categoria',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(user, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as Categorias',
  })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma categoria pelo seu ID',
  })
  findById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar uma categoria pelo seu ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma categoria pelo seu ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.categoryService.delete(user, id);
  }
}
