import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './models/orders.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([OrderModel])],
  providers: [OrdersService,JwtService],
  controllers: [OrdersController]
})
export class OrdersModule {}
