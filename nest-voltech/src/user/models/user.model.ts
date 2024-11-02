import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BasketModel } from 'src/basket/models/basket.models';
import { OrderModel } from 'src/orders/models/orders.model';
import { TokenModel } from 'src/token/models/token.model';

@Table({ tableName: 'Users', timestamps: false })
export class UserModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Misha', description: 'Логин пользователя' })
  @Column(DataType.STRING)
  login: string;

  @ApiProperty({ example: 'Miha6318', description: 'Пароль пользователя' })
  @Column(DataType.STRING)
  password: string;

  @ApiProperty({ example: 'user', description: 'Роль пользователя' })
  @Default('user')
  @Column(DataType.STRING)
  role: string;

  @HasOne(() => TokenModel, { foreignKey: 'userId' })
  token: TokenModel;

  @HasMany(() => OrderModel, { foreignKey: 'id_user' })
  orders: OrderModel[];

  @HasMany(() => BasketModel, { foreignKey: 'id_user' })
  baskets: BasketModel[];
}
