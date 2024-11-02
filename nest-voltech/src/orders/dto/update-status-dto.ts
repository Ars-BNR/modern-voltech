import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ example: 1, description: 'ID заказа' })
  @IsString()
  id_order: string;

  @ApiProperty({ example: 'Доставлен', description: 'Новый статус заказа' })
  @IsString()
  newStatus: string;
}
