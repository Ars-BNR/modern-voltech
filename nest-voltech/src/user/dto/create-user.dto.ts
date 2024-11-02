import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mihail', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 16, { message: 'Не меньше 6 и не больше 16' })
  readonly login: string;

  @ApiProperty({ example: '123142', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  password: string;
}
export class UserJWTData {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  role: string;

  constructor(model: UserJWTData) {
    this.login = model.login;
    this.id = model.id;
    this.role = model.role;
  }
}
