import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import * as path from 'path';
import { UserModel } from './user/models/user.model';
import { TokenModel } from './token/models/token.model';
import { CatalogModule } from './catalog/catalog.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentModel } from './equipment/models/equipment.model';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ImgModule } from './img/img.module';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';
import { BasketModel } from './basket/models/basket.models';
import { OrderModel } from './orders/models/orders.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'images'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [UserModel, TokenModel, EquipmentModel, OrderModel, BasketModel],
      autoLoadModels: true,
      synchronize: false,
    }),
    JwtModule.register({
      secret: 'your-secret-key', // Замените на ваш секретный ключ
      signOptions: { expiresIn: '60s' }, // Время истечения токена
    }),
    TokenModule,
    UserModule,
    CatalogModule,
    EquipmentModule,
    SeedModule,
    FilesModule,
    ImgModule,
    BasketModule,
    OrdersModule,
  ],
})
export class AppModule {}
