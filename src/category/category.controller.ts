import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  import { Category } from './entities/category.entity';

  @UseGuards(AuthGuard())
  @ApiTags('category')
  @ApiBearerAuth()
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post()
    @ApiOperation({ summary: 'register new category' })
    create(
      @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<Category | void> {
      return this.categoryService.create(createCategoryDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'list all category' })
    findAll(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'search category by id' })
    findOne(@Param('id') id: string): Promise<Category> {
      return this.categoryService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'update an category' })
    update(
      @Param('id') id: string,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category | void> {
      return this.categoryService.update(id, updateCategoryDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'delete a category' })
    remove(@Param('id') id: string) {
      return this.categoryService.remove(id);
    }
  }