import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { CreateUserDto, UserJWTData } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UserResponse } from './response/user-response';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUserByLogin(login: string): Promise<UserModel> {
    try {
      return this.userRepository.findOne({ where: { login } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateAndSaveTokens(userDTO: UserJWTData) {
    try {
      const tokens = await this.tokenService.generateTokens(userDTO);
      await this.tokenService.saveToken(userDTO.id, tokens.refreshToken);
      return { ...tokens, user: userDTO };
    } catch (error) {
      throw new Error(error);
    }
  }
  async setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true,
    });
  }

  async registration(dto: CreateUserDto): Promise<UserResponse> {
    try {
      const candidate = await this.findUserByLogin(dto.login);
      if (candidate) {
        throw new HttpException(
          'Пользователь уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await this.hashPassword(dto.password);
      const user = await this.userRepository.create({
        login: dto.login,
        password: hashPassword,
      });
      const userDto = new UserJWTData(user);
      return this.generateAndSaveTokens(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(dto: CreateUserDto) {
    try {
      const user = await this.findUserByLogin(dto.login);
      if (!user) {
        throw new HttpException(
          'Пользователь не найден',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPassEqual = await bcrypt.compare(dto.password, user.password);
      if (!isPassEqual) {
        throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
      }
      const userDto = new UserJWTData(user);
      return this.generateAndSaveTokens(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(refreshToken: string): Promise<Number> {
    try {
      const token = await this.tokenService.removeToken(refreshToken);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new HttpException(
          'Пользователь не авторизован',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userData =
        await this.tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await this.tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDB) {
        throw new HttpException(
          'Пользователь не авторизован',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userRepository.findOne({
        where: {
          id: userData.user.id,
        },
      });
      if (!user) {
        throw new HttpException(
          'Ошибка при создании пользователя',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userDto = new UserJWTData(user);
      return this.generateAndSaveTokens(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}
