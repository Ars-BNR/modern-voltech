import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EquipmentModel } from './models/equipment.model';
import { CreateEquipmentResponse } from './response/equipment-response';

@Injectable()
export class EquipmentService {
  @InjectModel(EquipmentModel)
  private readonly equipmentRepository: typeof EquipmentModel;

  async getEquipmentById(id: number): Promise<CreateEquipmentResponse> {
    try {
      const equipment = await this.equipmentRepository.findByPk(id);
      return equipment;
    } catch (error) {
      throw new Error(error)
    }
  }
}
