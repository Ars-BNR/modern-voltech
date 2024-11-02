import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindBasketDto {
  @ApiProperty({ example: '1', description: 'Id товара' })
  @IsNumber()
  id_equipment: number;

  @ApiProperty({ example: '1', description: 'Id пользователя' })
  @IsNumber()
  id_user: number;

}
