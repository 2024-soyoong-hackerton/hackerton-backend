import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './module/image/image.module';

@Module({
  imports: [ConfigModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
