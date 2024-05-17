import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaservice: PrismaService) {}

  async create(data: CreateUserDto): Promise<user> {
    const salt = randomBytes(16).toString('base64');
    const content: user = {
      name: data.name,
      id: data.id,
      password: pbkdf2Sync(data.password, salt, 10000, 64, 'SHA512').toString(
        'base64',
      ),
      salt,
    };
    const user = await this.prismaservice.user.create({ data: content });

    return user;
  }

  async findOne(id: string): Promise<user> {
    const user = await this.prismaservice.user.findFirst({ where: { id: id } });
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
}
