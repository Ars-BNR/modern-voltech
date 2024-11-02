import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
export class Equipment {
  @ApiProperty({ example: 'MSI', description: 'Бренд оборудования' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'ACER_TC-3060', description: 'Модель оборудования' })
  @IsString()
  model: string;

  @ApiProperty({ example: '74000', description: 'Цена оборудования' })
  @IsNumber()
  price: number;
}

export class Info {
  @ApiProperty({ example: '1', description: 'ID оборудования' })
  @IsNumber()
  id_equipment: number;

  @ApiProperty({ type: Equipment, description: 'Информация об оборудовании' })
  @IsObject()
  equipment: Equipment;

  @IsString()
  @ApiProperty({ example: '1', description: 'Количество товара' })
  count: string;
}
export class CreateOrderDto {
  @ApiProperty({ example: 'Милослав', description: 'Имя оформляющего заказ' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Суркин', description: 'Фамилия оформляющего заказ' })
  @IsString()
  surname: string;

  @ApiProperty({
    example: '+7-777-777-77-77',
    description: 'Телефон оформляющего заказ',
  })
  @IsString()
  number: string;

  @ApiProperty({
    example: 'г.Уфа, ул. Курандеево 12, кв. 234',
    description: 'Адрес доставки',
  })
  @IsString()
  address: string;

  @ApiProperty({ example: '1', description: 'id пользователя' })
  @IsNumber()
  id_user: number;

  @ApiProperty({ example: '152321', description: 'цена заказа' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '1', description: 'Общее кол-во товаров в заказе' })
  @IsNumber()
  allCount: number;

  @ApiProperty({
    example: {
      count: '1',
      equipment: {
        brand: 'MSI',
        model: 'ACER_TC-3060',
        price: '74000',
      },
      id_equipment: '1',
    },
    description: 'Информация о купленных товарах',
  })
  @IsArray()
  info: Info;
}
