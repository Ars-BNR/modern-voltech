import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { TokenModel } from './models/token.model';
import { CreateTokenResponse } from './response/token-response';
import { UserJWTData } from 'src/user/response/user-response';

@Injectable()
export class TokenService {
  private readonly JWT_ACCESS_SECRET: string;
  private readonly JWT_REFRESH_SECRET: string;
  private readonly EXPIRES_ACCESS_JWT: string;
  private readonly EXPIRES_REFRESH_JWT: string;

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(TokenModel)
    private readonly tokenRepository: typeof TokenModel,
  ) {}

  async generateTokens(user: UserJWTData): Promise<CreateTokenResponse> {
    try {
      const payload = { user };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.EXPIRES_ACCESS_JWT,
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.EXPIRES_REFRESH_JWT,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return tokenData;
    }
    return this.tokenRepository.create({ userId, refreshToken });
  }
  async removeToken(refreshToken: string): Promise<Number> {
    return this.tokenRepository.destroy({ where: { refreshToken } });
  }

  async findToken(refreshToken: string): Promise<TokenModel> {
    return this.tokenRepository.findOne({ where: { refreshToken } });
  }
}
