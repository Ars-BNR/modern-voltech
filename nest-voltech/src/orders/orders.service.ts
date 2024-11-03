import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/orders.model';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrderIdDto } from './dto/orderId-dto';
import { UpdateStatusDto } from './dto/update-status-dto';
import orderid from 'order-id';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private readonly orderRepository: typeof OrderModel,
  ) {}

  async insertOrder(order: CreateOrderDto): Promise<OrderModel> {
    try {
      function getCurrentDate(): string {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
      }

      let { name, surname, number, address, id_user, price, allCount, info } =
        order;
      id_user = +id_user;
      const status = String('Обработка');
      const id_order = orderid('key').generate();
      console.log(id_order, 'that id_order');
      const date = getCurrentDate();
      const newOrder = await this.orderRepository.create({
        name,
        surname,
        number,
        address,
        id_order,
        id_user,
        date,
        price,
        allCount,
        status,
        info,
      });
      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrderByUserId(id_user: number): Promise<OrderModel[]> {
    try {
      if (!id_user) {
        throw new HttpException(
          'Не указан id пользователя',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.orderRepository.findAll({
        where: { id_user: id_user },
        order: [['date', 'DESC']],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllOrders() {
    try {
      return await this.orderRepository.findAll({
        order: [['date', 'DESC']],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateStatus(dto: UpdateStatusDto): Promise<boolean> {
    try {
      if (!dto.id_order) {
        throw new HttpException('Не указан id заказа', HttpStatus.BAD_REQUEST);
      }

      const order = await this.orderRepository.findOne({
        where: { id_order: dto.id_order },
      });
      if (order) {
        order.status = dto.newStatus;
        await order.save();
        return true;
      } else {
        throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async cancelStatusUser(dto: OrderIdDto): Promise<boolean> {
    try {
      if (!dto.id_order) {
        throw new HttpException('Не указан id заказа', HttpStatus.BAD_REQUEST);
      }
      const order = await this.orderRepository.findOne({
        where: { id_order: dto.id_order },
      });
      const newStatus = 'Отменен пользователем';
      if (order) {
        order.status = newStatus;
        await order.save();
        return true;
      } else {
        throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOrder(dto: OrderIdDto): Promise<boolean> {
    try {
      if (!dto.id_order) {
        throw new HttpException('Не указан id заказа', HttpStatus.BAD_REQUEST);
      }

      const order = await this.orderRepository.findOne({
        where: { id_order: dto.id_order },
      });

      if (order) {
        await order.destroy();
        return true;
      } else {
        throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrderById(dto: OrderIdDto): Promise<OrderModel> {
    try {
      if (!dto.id_order) {
        throw new HttpException('Не указан id заказа', HttpStatus.BAD_REQUEST);
      }

      const order = await this.orderRepository.findOne({
        where: { id_order: dto.id_order },
      });
      if (!order)
        throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
