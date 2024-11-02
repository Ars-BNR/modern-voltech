import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const ValidateUserId = createParamDecorator(
  (data: 'param' | 'body'| 'idOrder', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userIdFromToken = request.user.user.id;

    if (data === 'body') {
      const dto = request.body; 

      const id_user = +dto.id_user; 

      
      if (!id_user) {
        throw new HttpException('Не указан id пользователя', HttpStatus.FORBIDDEN);
      }

      
      if (userIdFromToken !== id_user) {
        throw new HttpException('ID пользователя не совпадает с токеном', HttpStatus.FORBIDDEN);
      }

      return dto; 

    } else if (data === 'param') {
      const id_user = +request.params.id_user; 

      
      if (!id_user) {
        throw new HttpException('Не указан id пользователя', HttpStatus.FORBIDDEN);
      }

      
      if (userIdFromToken !== id_user) {
        throw new HttpException('ID пользователя не совпадает с токеном', HttpStatus.FORBIDDEN);
      }

      return id_user; 
    }else if (data === 'idOrder') {
      const id_user = +request.params.id_user; 
      const id_order = request.params.id_order; 

      
      if (!id_user) {
        throw new HttpException('Не указан id пользователя', HttpStatus.FORBIDDEN);
      }

      
      if (userIdFromToken !== id_user) {
        throw new HttpException('ID пользователя не совпадает с токеном', HttpStatus.FORBIDDEN);
      }

      return {id_user,id_order}; 
    }

    throw new HttpException('Неверный тип данных', HttpStatus.BAD_REQUEST);
  },
);
