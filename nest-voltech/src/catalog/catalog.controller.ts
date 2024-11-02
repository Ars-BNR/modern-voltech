import { Controller, Get,  Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryParamsDto } from './dto/query-dto';
import { GetAllEquipmentsResponse } from './response/equipments-response';
import { GetBrandsDto } from './dto/brands-dto';
@ApiTags('Каталог товаров')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({ summary: 'Получение товаров' })
  @ApiResponse({ status: 200, type: GetAllEquipmentsResponse })
  @Get()
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'price', required: false })
  @ApiQuery({ name: 'brand', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getAllEquipments(
    @Query() query: QueryParamsDto,
  ): Promise<GetAllEquipmentsResponse> {
    return this.catalogService.getAllEquipments(query);
  }

  @ApiOperation({ summary: 'Получение брендов товаров' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      example: ['ACER', 'IRU', 'MSI'], 
    },
  })
  @Get('/brands')
  getBrands(@Query() q: GetBrandsDto) {
    const brands = this.catalogService.getBrands(q.category);
    return brands;
  }
}
