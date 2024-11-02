import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { EquipmentModel } from 'src/equipment/models/equipment.model';

export class GetAllEquipmentsResponse {
  @ApiProperty({ example: '3', description: 'Общее количество пришедшего товара' })
  @IsNumber()
  total: number;

  @ApiProperty({ example: '1', description: 'Страница' })
  @IsNumber()
  page: number;

  @ApiProperty({ example: '2', description: 'Количество отображаемого товара на странице' })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: '2', description: 'Всего страниц с товаром' })
  @IsNumber()
  totalPages: number;

  @ApiProperty({ example: '84000', description: 'Максимальная сумма товара(берется с самого дорогого)' })
  @IsOptional()
  maxPrice: number | null;

  @ApiProperty({ example: '64000', description: 'Минимальная сумма товара(берется с самого дешевого)' })
  @IsOptional()
  minPrice: number | null;

  @ApiProperty({ type: [EquipmentModel] })
  data: EquipmentModel[];
}
