import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImgService {
    async getImg(img:string){
        const imagePath = join(__dirname,"..","images",`${img}.png`);
        if(!existsSync(imagePath)){
            throw new HttpException(
                "Изображение не найдено",
                HttpStatus.NOT_FOUND
              );
        }
        return imagePath
    }
}
