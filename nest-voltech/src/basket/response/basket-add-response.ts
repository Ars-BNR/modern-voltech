import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BasketAddResponse {
  @ApiProperty({ example: '1', description: 'Id корзины' })
  @IsNumber()
  idBasket: number;

  @ApiProperty({ example: '1', description: 'Id товара' })
  @IsNumber()
  id_equipment: number;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNumber()
  id_user: number;

  @ApiProperty({ example: '1', description: 'количество товара' })
  @IsNumber()
  count: number;
}
