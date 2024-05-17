import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { user } from '@prisma/client';

export class AuthService {
  constructor(
    private readonly jwtservice: JwtService,
    @Inject(UserService)
    private readonly userservice: UserService,
  ) {}

  createAccessToken(user: user): string {
    const payload = {
      user: user.id,
    };
    const accessToken = this.jwtservice.sign(payload);
    return accessToken;
  }

  verifyToken(token: string): any {
    try {
      return this.jwtservice.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async verifyUser(data: LoginDto): Promise<user | null> {
    const user = await this.userservice.findOne(data.id);
    if (!user) {
      throw new BadRequestException('아이디가 틀립니다!');
    }
    const isMatched = data.password == user.password;
    if (isMatched) {
      return user;
    } else {
      throw new BadRequestException('비밀번호가 틀립니다!');
    }
  }
}
