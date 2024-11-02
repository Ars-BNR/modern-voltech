import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBasketDto } from './dto/create-basket.dto';
import { BasketModel } from './models/basket.models';
import { FindBasketDto } from './dto/find-basket-dto';
import { ResponseBasket } from './response/basket-response';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ValidateUserId } from 'src/decorators/validate-userId.decorators';

@ApiTags('Корзина')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'добавление товаров в корзину' } )
  @ApiResponse({ status: 201, type: BasketModel })
  @ApiBody({type:CreateBasketDto})
  @UseGuards(JwtAuthGuard)
  @Post()
  addToBasket(@ValidateUserId('body')  basketDTO: CreateBasketDto) {
    return this.basketService.addToBasket(basketDTO);
  }

  @ApiOperation({ summary: 'получение корзины товаров пользователя по его id' })
  @ApiResponse({ status: 200, type: ResponseBasket })
  @ApiParam({ name: 'id_user', type: 'number', description: 'ID пользователя' })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id_user')
  getBasket(@ValidateUserId('param') id_user: number) {
    return this.basketService.getBasket(id_user);
  }

  @ApiOperation({ summary: 'удаление товаров из корзины пользователя' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBody({ type:FindBasketDto})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteBasket(
    @ValidateUserId('body') { id_equipment, id_user }: FindBasketDto,
  ): Promise<boolean> {
    return this.basketService.deleteBasket({ id_equipment, id_user });
  }

  @ApiOperation({
    summary: 'изменение количества товаров в корзине пользователя',
  })
  @ApiResponse({ status: 200, type: BasketModel })
  @ApiBody({ type:FindBasketDto})
  @UseGuards(JwtAuthGuard)
  @Patch()
  decreaseItemCount( @ValidateUserId('body') { id_equipment, id_user }: FindBasketDto) {
    return this.basketService.decreaseItemCount({ id_equipment, id_user });
  }

  @ApiOperation({
    summary: 'очистка корзины пользователя после формирования заказа',
  })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiParam({ name: 'id_user', type: 'number', description: 'ID пользователя' })
  @UseGuards(JwtAuthGuard)
  @Delete('/clear/:id_user')
  clearBasket(
    @ValidateUserId('param') id_user: number,
): Promise<boolean> {
    return this.basketService.clearBasket(id_user);
  }
}
