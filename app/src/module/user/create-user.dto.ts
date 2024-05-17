import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: '사용자의 name입니다.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '해당 사진에 대한 설명, 스토리입니다.',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '해당 사진에 대한 설명, 스토리입니다.',
  })
  @IsString()
  password: string;
}