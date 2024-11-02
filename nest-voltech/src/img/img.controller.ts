import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImgService } from './img.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetImgDto } from './dto/img-dto';

@ApiTags('Изображения товаров')
@Controller('img')
export class ImgController {
    constructor(private readonly imgService: ImgService) {}

  @ApiOperation({ summary: 'получение картиники товара по его пути' })
    @Get(":images")
   async getImg(@Param() params: GetImgDto, @Res() res: Response) {
        const imagePath = await this.imgService.getImg(params.images);
        return res.sendFile(imagePath);
      }
}
