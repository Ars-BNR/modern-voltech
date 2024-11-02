import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import equipments from './data/equipments-seed';
import user from './data/user-seed';
import { UserModel } from 'src/user/models/user.model';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(EquipmentModel) private equipmentModel: typeof EquipmentModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
  ) {}

  async seed() {
    await this.seedEquipments();
    await this.seedUser();
  }

  async seedEquipments() {
    const count = await this.equipmentModel.count();
    if (count === 0) {
      await this.equipmentModel.bulkCreate(equipments);
      console.log('Equipments seeded successfully');
    }
  }

  async seedUser() {
    const count = await this.userModel.count();
    if (count === 0) {
      await this.userModel.bulkCreate(user);
      console.log('Profiles seeded successfully');
    }
  }
}
