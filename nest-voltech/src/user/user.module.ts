import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from 'src/token/token.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TokenModule, SequelizeModule.forFeature([UserModel])],
  providers: [UserService,JwtService],
  controllers: [UserController],
})
export class UserModule {}
