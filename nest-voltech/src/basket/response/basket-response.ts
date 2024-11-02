import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InfoEquipment {
  @ApiProperty({ example: 'PC', description: 'Тип товара' })
  @IsString()
  type_equip: string;

  @ApiProperty({ example: '64000', description: 'Цена товара' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'IRU_510B6GMA',
    description: 'Наименование картинки',
  })
  @IsString()
  pathimg: string;

  @ApiProperty({ example: 'IRU', description: 'Бренд товара' })
  @IsString()
  brand: string;

  @ApiProperty({ example: '510B6GMA', description: 'Модель товара' })
  @IsString()
  model: string;
}

export class ResponseBasket {
  @ApiProperty({ example: '1', description: 'Id корзины' })
  @IsNumber()
  idBasket: number;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNumber()
  id_user: number;

  @ApiProperty({ example: '1', description: 'количество товара' })
  @IsNumber()
  count: number;

  @ApiProperty({ example: '1', description: 'количество товара' })
  @IsNumber()
  equipment: InfoEquipment;
}
