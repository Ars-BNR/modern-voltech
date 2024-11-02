import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEquipmentResponse } from './response/equipment-response';
@ApiTags('Товар')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({ summary: 'Получение товара по его id' })
  @ApiResponse({
    status: 200,
    type: CreateEquipmentResponse,
  })
  @Get(':id')
  async getEquipmentById(@Param('id') id: number) {
    return this.equipmentService.getEquipmentById(Number(id));
  }
}
