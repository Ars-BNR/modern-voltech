import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BasketModel } from 'src/basket/models/basket.models';

@Table({ tableName: 'Equipments', timestamps: false })
export class EquipmentModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'PC', description: 'Тип товара' })
  @Column(DataType.STRING)
  type_equip: string;

  @ApiProperty({ example: '90000', description: 'Цена товара' })
  @Column(DataType.INTEGER)
  price: number;

  @ApiProperty({
    example: 'IRU_510B6GMA',
    description: 'Путь к изображению оборудования',
  })
  @Column(DataType.TEXT)
  pathimg: string;

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
  @Column(DataType.JSONB)
  short_info: Record<string, any>;

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
  @Column(DataType.JSONB)
  main_info: Record<string, any>;

  @ApiProperty({
    example: {
      description:
        'Практичный компьютер IRU создан для решения любых геймерских задач.',
    },
    description: 'Описание оборудования',
  })
  @Column(DataType.JSONB)
  description: Record<string, any>;

  @HasMany(() => BasketModel, { foreignKey: 'id_equipment' })
  baskets: BasketModel[];
}
