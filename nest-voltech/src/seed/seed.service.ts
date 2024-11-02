import { Injectable } from '@nestjs/common';
import equipments from './data/equipments-seed';
import user from './data/user-seed';
import { InjectModel } from '@nestjs/sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import { UserModel } from 'src/user/models/user.model';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(EquipmentModel) private equipmentModel: typeof EquipmentModel,
    @InjectModel(UserModel) private userModel: typeof UserModel,
  ) {}

  private async autoInsert(model: any, seedData: object[]) {
    const count = await model.count();
    if (count === 0) {
      await model.bulkCreate(seedData);
      console.log(`✅ Данные добавлены в ${model.name}`);
    }
  }

  // Функция для запуска всех сидов
  async seed() {
    await this.autoInsert(this.equipmentModel, equipments);
    await this.autoInsert(this.userModel, user);
    console.log('✅ Все сиды успешно добавлены!');
  }
}
