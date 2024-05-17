import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ResponseDto } from 'src/types/response.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtAccessGuard } from './guard/jwt-access.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly userservice: UserService,
  ) {}

  @Post('/login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDto<null>> {
    console.log(data);
    const user = await this.authservice.verifyUser(data);
    if (user) {
      const accessToken = this.authservice.createAccessToken(user);
      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.cookie('access_token', accessToken);
      return ResponseDto.success('login_success');
    } else {
      throw new UnauthorizedException({
        message: 'login_failed.',
      });
    }
  }

  @Post('/logout')
  async logout(@Req() req: any, @Res() res: any) {
    res.clearCookie('access_token');
    return {
      message: '로그아웃 되었습니다.',
    };
  }

  @Get('/login')
  @UseGuards(JwtAccessGuard)
  logincheck(@Req() req: any): ResponseDto<any> {
    if (req.user) {
      return ResponseDto.success('login with', { user_id: req.user });
    }
  }
}