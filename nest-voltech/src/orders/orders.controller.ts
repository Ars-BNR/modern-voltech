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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrderModel } from './models/orders.model';
import { UpdateStatusDto } from './dto/update-status-dto';
import { OrderIdDto } from './dto/orderId-dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ValidateUserId } from 'src/decorators/validate-userId.decorators';
@ApiTags('Заказы')
@Controller('order')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 201, type: OrderModel })
  @UseGuards(JwtAuthGuard)
  @Post()
  insertOrder(@Body() dto: CreateOrderDto): Promise<OrderModel> {
    return this.orderService.insertOrder(dto);
  }

  @ApiOperation({ summary: 'Получение заказа пользователя по его id ' })
  @ApiResponse({ status: 200, type: OrderModel })
  @ApiParam({ name: 'id_user', type: 'number', description: 'ID пользователя' })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id_user')
  getOrderByUserId(
    @ValidateUserId('param') id_user: number,
  ): Promise<OrderModel[]> {
    return this.orderService.getOrderByUserId(id_user);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [OrderModel] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getAll')
  selectAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: 'Изменение статуса заказа' })
  @ApiResponse({ status: 200, type: Boolean })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/status')
  changeStatusOrder(@Body() dto: UpdateStatusDto): Promise<boolean> {
    return this.orderService.updateStatus(dto);
  }

  @ApiOperation({ summary: 'Отмена заказа пользователем' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiParam({ name: 'id_user', type: 'number', description: 'ID пользователя' })
  @ApiParam({ name: 'id_order', type: 'number', description: 'ID заказа' })
  @UseGuards(JwtAuthGuard)
  @Patch('/usercancel/:id_user/:id_order')
  cancelStatusUser(@ValidateUserId('idOrder') param: OrderIdDto) {
    return this.orderService.cancelStatusUser(param);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({ status: 200, type: Boolean })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id_order')
  deleteOrder(@Param() param: OrderIdDto): Promise<boolean> {
    return this.orderService.deleteOrder(param);
  }

  @ApiOperation({ summary: 'Получение данных о заказа по его id' })
  @ApiResponse({ status: 200, type: OrderModel })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id_user/:id_order')
  getOrderById(
    @ValidateUserId('idOrder') param: OrderIdDto,
  ): Promise<OrderModel> {
    return this.orderService.getOrderById(param);
  }
}
