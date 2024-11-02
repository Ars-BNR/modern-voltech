import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import { UserModel } from 'src/user/models/user.model';

@Table({ tableName: 'Baskets', timestamps: false })
export class BasketModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  idBasket: number;

  @ApiProperty({ example: '1', description: 'Id товара' })
  @ForeignKey(() => EquipmentModel)
  @Column(DataType.INTEGER)
  id_equipment: number;

  @BelongsTo(() => EquipmentModel)
  equipment: EquipmentModel;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  id_user: number;

  @ApiProperty({ example: '1', description: 'Количество товара' })
  @Column(DataType.INTEGER)
  @IsNumber()
  count: number;
}
