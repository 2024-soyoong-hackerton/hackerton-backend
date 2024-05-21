import {
  Controller,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/types/response.dto';
import { ImageService } from './image.service';

@Injectable()
@Controller('/image')
export class ImageController {
  constructor(private readonly imageservice: ImageService) {}

  @Post('/upload')
  @ApiOperation({
    summary: '이미지 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    type: ResponseDto<string>,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseDto<any>> {
    const result = await this.imageservice.imageUploadToS3(file);

    return ResponseDto.created('upload_success', { imagePath: result });
  }
}
