import { EquipmentModel } from './models/equipment.model';
import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentModel])],
  providers: [EquipmentService],
  controllers: [EquipmentController],
})
export class EquipmentModule {}
