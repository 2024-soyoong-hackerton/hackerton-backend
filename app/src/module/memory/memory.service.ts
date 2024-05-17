import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { memory, Prisma } from '@prisma/client';
import { CreateMemoryDto } from './create-memory.dto';
import { UpdateMemoryDto } from './update-memory.dto';

@Injectable()
export class MemoryService {
  constructor(private readonly prismaservice: PrismaService) {}

  async create(data: CreateMemoryDto, userId: string): Promise<memory> {
    const content: Prisma.memoryCreateInput = {
      ...data,
      user: { connect: { id: userId } },
    };
    const memory = await this.prismaservice.memory.create({ data: content });

    const pointContent: Prisma.pointCreateInput = {
      x: data.age,
      y: data.estimation,
      user: { connect: { id: userId } },
      memory: { connect: { id: memory.id } },
    };
    const point = await this.prismaservice.point.create({ data: pointContent });

    return memory;
  }

  async findOne(memoryId: string) {
    const memory = await this.prismaservice.memory.findFirst({
      where: { id: memoryId },
    });
    return memory;
  }

  async findAllByUserId(userId: string): Promise<memory[]> {
    const memory = await this.prismaservice.memory.findMany({
      where: { user_id: userId },
    });
    if (!memory) {
      return null;
    }
    return memory;
  }

  async updateOne(memoryId: string, data: UpdateMemoryDto): Promise<memory> {
    const content: Prisma.memoryUpdateInput = {
      ...data,
    };
    const memory = await this.prismaservice.memory.update({
      where: { id: memoryId },
      data: content,
    });

    return memory;
  }

  async deleteOne(memoryId: string): Promise<memory> {
    const memory = await this.prismaservice.memory.delete({
      where: { id: memoryId },
    });

    return memory;
  }
}
