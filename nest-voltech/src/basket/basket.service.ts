import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BasketModel } from './models/basket.models';
import sequelize from 'sequelize';
import { EquipmentModel } from 'src/equipment/models/equipment.model';
import { FindBasketDto } from './dto/find-basket-dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(BasketModel)
    private readonly basketRepository: typeof BasketModel,
  ) {}

  async addToBasket(basketDTO: CreateBasketDto) {
    try {
      if (!basketDTO.id_equipment || !basketDTO.id_user || !basketDTO.count) {
        throw new HttpException(
          `Не все параметры указаны: id_equipment:${basketDTO.id_equipment}, id_user:${basketDTO.id_user}, count:${basketDTO.count}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const isExsistBasket = await this.basketRepository.findOne({
        where: {
          id_equipment: basketDTO.id_equipment,
          id_user: basketDTO.id_user,
        },
      });
      if (isExsistBasket) {
        isExsistBasket.count += basketDTO.count;
        await isExsistBasket.save();
        return isExsistBasket;
      } else {
        const newBasket = await this.basketRepository.create({
          id_equipment: basketDTO.id_equipment,
          id_user: basketDTO.id_user,
          count: basketDTO.count,
        });
        return newBasket;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBasket(id_user: number) {
    try {
      if (!id_user) {
        throw new HttpException(
          'Не указан id пользователя',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const basket = await this.basketRepository.findAll({
        where: { id_user },
        include: [
          {
            model: EquipmentModel,
            as: 'equipment',
            attributes: [
              'type_equip',
              'price',
              'pathimg',
              [sequelize.literal(`"equipment"."main_info"->>'Бренд'`), 'brand'],
              [sequelize.literal(`"equipment"."main_info"->>'Модель'`), 'model'],
            ],
          },
        ],
      });
      return basket;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBasket(dto: FindBasketDto): Promise<boolean> {
    try {
      if (!dto.id_equipment || !dto.id_user) {
        throw new HttpException(
          `Не все параметры id_equipment:${dto.id_equipment}, id_user:${dto.id_user} указаны`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.basketRepository.destroy({
        where: { id_equipment: dto.id_equipment, id_user: dto.id_user },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async decreaseItemCount({ id_equipment, id_user }: FindBasketDto) {
    try {
      if (!id_equipment || !id_user) {
        throw new HttpException(
          `Не все параметры id_equipment:${id_equipment}, id_user:${id_user} указаны`,
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const basket = await this.basketRepository.findOne({
        where: { id_equipment, id_user },
      });
  
      if (basket) {
        basket.count = basket.count > 1 ? basket.count - 1 : 1;
  
        if (basket.count === 0) {
          return basket.destroy();
        } else {
          return basket.save();
        }
      } else {
        throw new HttpException(
          'Товар в корзине не найден',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearBasket(id_user: number): Promise<boolean> {
    try {
      //проверка токена на соотвествие в id_user
      if (!id_user) {
        throw new HttpException(
          'Не указан id пользователя',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      await this.basketRepository.destroy({ where: { id_user } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
