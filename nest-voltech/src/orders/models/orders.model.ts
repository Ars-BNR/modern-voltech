import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/models/user.model';
export class Equipment {
  @ApiProperty({ example: 'MSI', description: 'Бренд оборудования' })
  @Column(DataType.STRING)
  brand: string;

  @ApiProperty({ example: 'ACER_TC-3060', description: 'Модель оборудования' })
  @Column(DataType.STRING)
  model: string;

  @ApiProperty({ example: '74000', description: 'Цена оборудования' })
  @Column(DataType.INTEGER)
  price: number;
}

export class Info {
  @ApiProperty({ example: '1', description: 'ID оборудования' })
  id_equipment: string;

  @ApiProperty({ type: Equipment, description: 'Информация об оборудовании' })
  equipment: Equipment;

  @ApiProperty({ example: '1', description: 'Количество товара' })
  count: string;
}
@Table({ tableName: 'Orders', timestamps: false })
export class OrderModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Милослав', description: 'Имя оформляющего заказ' })
  @Column(DataType.STRING)
  name: string;

  @ApiProperty({ example: 'Суркин', description: 'Фамилия оформляющего заказ' })
  @Column(DataType.STRING)
  surname: string;

  @ApiProperty({
    example: '+7-777-777-77-77',
    description: 'Телефон оформляющего заказ',
  })
  @Column(DataType.STRING)
  number: string;

  @ApiProperty({
    example: 'г.Уфа, ул. Курандеево 12, кв. 234',
    description: 'Адрес доставки',
  })
  @Column(DataType.TEXT)
  address: string;

  @ApiProperty({ example: '8976-87653-7567', description: 'id заказа' })
  @Column(DataType.STRING)
  id_order: string;

  @ApiProperty({ example: '1', description: 'id пользователя' })
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  id_user: number;

  @ApiProperty({ example: '27-07-24', description: 'дата заказа' })
  @Column(DataType.DATEONLY)
  date: string;

  @ApiProperty({ example: '152321', description: 'цена заказа' })
  @Column(DataType.INTEGER)
  price: number;

  @ApiProperty({ example: '1', description: 'Общее кол-во товаров в заказе' })
  @Column(DataType.INTEGER)
  allCount: number;

  @ApiProperty({ example: 'Обработка', description: 'статус заказа' })
  @Column(DataType.STRING)
  status: string;

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
  @Column(DataType.JSONB)
  info: Equipment;
}
