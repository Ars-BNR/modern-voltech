import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OrderIdDto {
  @ApiProperty({
    example: '468a215f-9ca9-40f7-b45a-d43a10c98d9d',
    description: 'ID заказа',
  })
  @IsString()
  id_order: string;
}
