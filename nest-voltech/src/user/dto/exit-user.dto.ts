import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExitUserDto {
  @ApiProperty({ example: '12kjhnjhb', description: 'Refresh токен' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Не должен быть пустым' })
  refreshToken: string;
}