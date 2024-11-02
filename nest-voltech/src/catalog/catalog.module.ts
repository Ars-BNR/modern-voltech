import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentModel])],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
