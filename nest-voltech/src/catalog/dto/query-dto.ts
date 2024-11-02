import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
