import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '사용자의 id입니다.',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '사용자의 비밀번호입니다.',
  })
  @IsString()
  password: string;
}
