import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { memory, point, user } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';
import { MemoryService } from '../memory/memory.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaservice: PrismaService,
    private readonly memoryservice: MemoryService,
    private readonly aiservice: AiService,
  ) {}

  async create(data: CreateUserDto): Promise<user> {
    const content: user = {
      name: data.name,
      id: data.id,
      password: data.password,
    };
    const user = await this.prismaservice.user.create({ data: content });

    return user;
  }

  async findOne(id: string): Promise<user> {
    const user = await this.prismaservice.user.findFirst({
      where: { id: id },
      include: { memories: true },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findAll(): Promise<user[]> {
    const users = await this.prismaservice.user.findMany();
    return users;
  }

  async updateOne(id: string, data: UpdateUserDto): Promise<user> {
    const user = await this.prismaservice.user.update({
      where: { id: id },
      data: data,
    });

    return user;
  }

  async deleteOne(id: string): Promise<user> {
    const user = await this.prismaservice.user.delete({ where: { id: id } });

    return user;
  }

  async findAllMemoryByUserId(id: string): Promise<memory[]> {
    const memories = await this.memoryservice.findAllByUserId(id);

    return memories;
  }

  async findAllPointByUserId(id: string): Promise<Partial<any>> {
    const points = await this.prismaservice.point.findMany({
      where: { user_id: id },
      select: {
        user_id: false,
        memory_id: false,
        x: true,
        y: true,
        user: false,
        memory: { select: { title: true, content: true } },
      },
    });
    let contents = '';
    points.forEach((item) => {
      contents += item.memory.content;
      contents += ' ';
    });
    console.log(contents);
    const tag = this.aiservice.getTag(contents);
    console.log(tag);

    return { points: points, tag: tag };
  }
}
