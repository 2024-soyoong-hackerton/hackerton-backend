import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMemoryDto {
  @ApiProperty({
    description: '공개 범위를 1~3 내에서 지정해주세요.',
  })
  level: number;

  @ApiProperty({
    description: '/image/upload로부터 반환받은 imagePath를 추가해주세요.',
  })
  @IsString()
  photo: string;

  @ApiProperty({
    description: '해당 순간에 대한 간단한 제목입니다.',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '해당 사진에 대한 설명, 스토리입니다.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '언제 있었던 일인지 작성합니다.',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description:
      '해당 순간이 얼마나 긍정적이었는지, -10부터 10까지 나타냅니다.',
  })
  @IsNumber()
  estimation: number;
}
