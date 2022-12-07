import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Favorites } from 'src/favorites/dto/entities/favorite-entity'; 
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; 
import { UsersService } from './services/users.service'; 

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'register new users' })
  create(@Body() createUserDto: CreatUserDto): Promise<User | void> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({ summary: 'list all users present in the database' })
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiOperation({ summary: 'search user by id' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Get('favorite/:id')
  @ApiOperation({ summary: 'list all user favorites, use user id' })
  @ApiBearerAuth()
  listFavoritesProducts(@Param('id') id: string): Promise<Favorites[]> {
    return this.usersService.listFavoritesProducts(id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  @ApiOperation({ summary: 'update user' })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateUserdto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.update(id, updateUserdto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  @ApiOperation({ summary: 'delete user' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}