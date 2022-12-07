import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; 
import { UsersService } from './services/users.service'; 

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário',
  })
  create(@Body() createUserDto: CreatUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string) : Promise<User>{
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar um usuário pelo ID' })

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string,
  @Body() updateUserdto: UpdateUserDto,
  ): Promise<User | void>{
        return this.usersService.update(id, updateUserdto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}