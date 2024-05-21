import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/types/response.dto';
import { memory, point, user } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('사용자 관련 Api')
@Injectable()
@Controller('/user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @ApiOperation({
    summary: '사용자 생성; 회원가입',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    type: ResponseDto<user>,
  })
  @Post('/')
  async register(@Body() data: CreateUserDto): Promise<ResponseDto<user>> {
    try {
      const user = await this.userservice.create(data);
      return ResponseDto.created('register_success', user);
    } catch (err) {
      return ResponseDto.error('register_failed', err);
    }
  }

  @ApiOperation({
    summary: '단일 사용자 조회',
  })
  @ApiParam({
    type: String,
    description: '사용자 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto<user>,
  })
  @Get('/:id')
  async getData(@Param('id') id: string): Promise<ResponseDto<user>> {
    const result = await this.userservice.findOne(id);

    return ResponseDto.success('inqury_success', result);
  }

  @ApiOperation({
    summary: '다중 사용자 조회',
  })
  @ApiResponse({
    type: ResponseDto<user[]>,
  })
  @Get()
  async getUsers(): Promise<ResponseDto<user[]>> {
    const result = await this.userservice.findAll();

    return ResponseDto.success('inqury_success', result);
  }

  @ApiOperation({
    summary: '단일 사용자 수정',
  })
  @ApiParam({
    type: String,
    description: '사용자 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto.created<user>,
  })
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseDto<user>> {
    const result = await this.userservice.updateOne(id, data);

    return ResponseDto.created('update_success', result);
  }

  @ApiOperation({
    summary: '단일 사용자 수정',
  })
  @ApiParam({
    type: String,
    description: '사용자 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto.created<user>,
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<ResponseDto<user>> {
    const result = await this.userservice.deleteOne(id);

    return ResponseDto.success('delete_success', result);
  }

  @ApiOperation({
    summary: '사용자가 작성한 모든 순간 조회',
  })
  @ApiParam({
    type: String,
    description: '사용자 id',
    name: 'id',
  })
  @Get('/memory/:id')
  async getmemories(@Param('id') id: string): Promise<ResponseDto<memory[]>> {
    const memories = await this.userservice.findAllMemoryByUserId(id);

    return ResponseDto.success('inquiry_success', memories);
  }

  @ApiOperation({
    summary: '해당 사용자의 그래프 포인트 조회',
  })
  @ApiParam({
    type: String,
    description: '사용자 id',
    name: 'id',
  })
  @Get('/graph/:id')
  async get(@Param('id') id: string): Promise<ResponseDto<Partial<any>>> {
    const points = await this.userservice.findAllPointByUserId(id);

    return ResponseDto.success('inquiry_success', points);
  }
}
