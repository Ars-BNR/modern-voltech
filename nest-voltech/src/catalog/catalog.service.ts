import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import { QueryParamsDto } from './dto/query-dto';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(EquipmentModel)
    private readonly eqipmentsRepository: typeof EquipmentModel,
  ) {}

  async getAllEquipments(query: QueryParamsDto) {
    try {
      const where: any = {};
  
      if (query.category) {
        where.type_equip = query.category;
      }
  
      if (query.price) {
        if (query.price.includes('-')) {
          const [minPrice, maxPrice] = query.price.split('-').map(Number);
          where.price = {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice,
          };
        } else {
          where.price = Number(query.price);
        }
      }
  
      if (query.brand) {
        const brands = query.brand.split(',');
        where['main_info'] = {
          Бренд: {
            [Op.in]: brands,
          },
        };
      }
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 2;
  
      const offset = (page - 1) * limit;
  
      const { count, rows } = await this.eqipmentsRepository.findAndCountAll({
        where,
        limit,
        offset,
      });
      const maxPrice: number | null = await this.eqipmentsRepository.max(
        'price',
        { where },
      );
      const minPrice: number | null = await this.eqipmentsRepository.min(
        'price',
        { where },
      );
      const totalPages = Math.ceil(count / limit);
  
      return {
        total: count,
        page,
        limit,
        totalPages,
        maxPrice,
        minPrice,
        data: rows,
      };
    } catch (error) {
      throw new Error(error)
    }
  }

  async getBrands(category: string) {
    try {
      const brands = await this.eqipmentsRepository.findAll({
        attributes: [
          [
            Sequelize.fn('DISTINCT', Sequelize.json("main_info->>'Бренд'")),
            'brand',
          ],
        ],
        where: { type_equip: category },
      });
      return brands.map((brand: any) => brand.get('brand'));
    } catch (error) {
      throw new Error(error)
    }
  }
}
