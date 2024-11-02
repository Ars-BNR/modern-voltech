import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateEquipmentResponse {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  id: number;

  @IsString()
  @ApiProperty({ example: 'PC', description: 'Тип товара' })
  type_equip: string;

  @IsNumber()
  @ApiProperty({ example: '90000', description: 'Цена товара' })
  price: number;

  @IsString()
  @ApiProperty({
    example: 'IRU_510B6GMA',
    description: 'Путь к изображению оборудования',
  })
  pathimg: string;

  @IsObject()
  @ApiProperty({
    example: {
      Процессор: 'Intel Core i5-12400F 2.5 ГГц',
      'Оперативная память': '16 ГБ, DDR4, DIMM, 3200 МГц',
      Диски: 'SSD 1024 ГБ',
      Графика: 'NVIDIA GeForce GTX 1650 - 4 ГБ',
      'Операционная система': 'Free DOS',
    },
    description: 'Краткая информация об оборудовании',
  })
  short_info: Record<string, any>;

  @IsObject()
  @ApiProperty({
    example: {
      Бренд: 'IRU',
      Модель: '510B6GMA',
      Процессор: {
        'Сокет процессора': 'LGA 1700',
        Процессор: 'Intel Core i5 12400F',
        'Частота процессора': '2.5 ГГц (4.4 ГГц в Turbo)',
        'Количество ядер': '6',
      },
      'Оперативная память': {
        'Оперативная память': '16 ГБ, DDR4, DIMM, 3200 МГц',
        'Максимальный объем': '64 ГБ',
      },
      'Графический адаптер': {
        'Тип контроллера': 'дискретный',
        Графика: 'NVIDIA GeForce GTX 1650 - 4 ГБ',
      },
    },
    description: 'Основная информация об оборудовании',
  })
  main_info: Record<string, any>;

  @IsObject()
  @ApiProperty({
    example: {
      description:
        'Практичный компьютер IRU создан для решения любых геймерских задач.',
    },
    description: 'Описание оборудования',
  })
  description: Record<string, any>;
}
