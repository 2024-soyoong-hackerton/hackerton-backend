import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './module/image/image.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [ConfigModule, ImageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
