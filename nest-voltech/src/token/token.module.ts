import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModel } from './models/token.model';

@Module({
  imports: [SequelizeModule.forFeature([TokenModel])],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
