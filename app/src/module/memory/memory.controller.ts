import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemoryService } from './memory.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/types/response.dto';
import { memory } from '@prisma/client';
import { CreateMemoryDto } from './create-memory.dto';
import { UpdateMemoryDto } from './update-memory.dto';
import { JwtAccessGuard } from '../auth/guard/jwt-access.guard';
import { request } from 'http';

@ApiTags('게시글(Memory) 관련 Api')
@Injectable()
@Controller('/memory')
export class MemoryController {
  constructor(private readonly memoryservice: MemoryService) {}

  @ApiOperation({
    summary: '순간 쓰기. 로그인이 필요한 서비스입니다.',
  })
  @ApiBody({
    type: CreateMemoryDto,
  })
  @ApiResponse({
    type: ResponseDto<memory>,
  })
  @Post('/')
  @UseGuards(JwtAccessGuard)
  async register(
    @Req() request,
    @Body() data: CreateMemoryDto,
  ): Promise<ResponseDto<memory>> {
    const memory = await this.memoryservice.create(data, request.user);

    return ResponseDto.created('register_success', memory);
  }

  @ApiOperation({
    summary: '단일 순간 조회. 로그인이 필요한 서비스입니다.',
  })
  @ApiParam({
    type: String,
    description: '순간 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto<memory>,
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  async getData(
    @Req() request,
    @Param('id') id: string,
  ): Promise<ResponseDto<memory>> {
    const result = await this.memoryservice.findOne(id);
    if (request.user != result.user_id) {
      return ResponseDto.error('권한이 없습니다!');
    }

    return ResponseDto.success('inqury_success', result);
  }

  @ApiOperation({
    summary: '단일 순간 수정, 로그인이 필요한 서비스입니다.',
  })
  @ApiParam({
    type: String,
    description: '순간 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto.success<memory>,
  })
  @Patch('/:id')
  async updateMemory(
    @Req() request,
    @Param('id') id: string,
    @Body() data: UpdateMemoryDto,
  ): Promise<ResponseDto<memory>> {
    const memory = await this.memoryservice.findOne(id);
    if (request.user != memory.user_id) {
      return ResponseDto.error('권한이 없습니다!');
    }
    const result = await this.memoryservice.updateOne(id, data);

    return ResponseDto.created('update_success', result);
  }

  @ApiOperation({
    summary: '단일 순간 삭제. 로그인이 필요한 서비스입니다.',
  })
  @ApiParam({
    type: String,
    description: '순간 id',
    name: 'id',
  })
  @ApiResponse({
    type: ResponseDto.success<memory>,
  })
  @Delete('/:id')
  async deleteMemory(
    @Req() request,
    @Param('id') id: string,
  ): Promise<ResponseDto<memory>> {
    const memory = await this.memoryservice.findOne(id);
    if (request.user != memory.user_id) {
      return ResponseDto.error('권한이 없습니다!');
    }
    const result = await this.memoryservice.deleteOne(id);

    return ResponseDto.success('delete_success', result);
  }
}
