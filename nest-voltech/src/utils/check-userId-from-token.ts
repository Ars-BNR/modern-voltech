import {  HttpException, HttpStatus } from '@nestjs/common';

export function validateUserId(userIdFromToken: number, userIdFromParam: number): void {
  if (userIdFromToken !== userIdFromParam) {
    throw new HttpException('У вас нет прав на выполнение этого действия',HttpStatus.FORBIDDEN);
  }
}
