import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import { UserModel } from 'src/user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentModel, UserModel])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
