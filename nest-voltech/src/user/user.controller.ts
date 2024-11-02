import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user-response';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExitUserDto } from './dto/exit-user.dto';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
@ApiTags('Пользователи')
@Controller()
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserResponse })
  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    const userData = await this.usersService.registration(userDto);
    await this.usersService.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @ApiOperation({ summary: 'Вход в учетную запись пользователя' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    const userData = await this.usersService.login(userDto);
    await this.usersService.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @ApiOperation({ summary: 'Выход из учетной записи пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешный выход',
    schema: {
      type: 'number',
      example: 1,
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Number> {
    const { refreshToken } = req.cookies;
    const token = this.usersService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  @ApiOperation({ summary: 'Обновление токенов пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Токены успешно обновлены',
    type: UserResponse,
  })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.usersService.refresh(refreshToken);
      await this.usersService.setRefreshTokenCookie(res, userData.refreshToken);
      return userData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  getAll() {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      throw new Error(error);
    }
  }
}
