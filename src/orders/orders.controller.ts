import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/users/entities/user.entity'; 
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service'; 

@ApiTags('orders')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('orders')

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um pedido',
  })
  create(@LoggedUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create( createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os pedidos',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um pedido pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}