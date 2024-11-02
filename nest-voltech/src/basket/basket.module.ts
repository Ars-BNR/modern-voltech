import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketModel } from './models/basket.models';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([BasketModel])],
  providers: [BasketService, JwtService],
  controllers: [BasketController],
})
export class BasketModule {}
