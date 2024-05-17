import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './module/image/image.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { MemoryModule } from './module/memory/memory.module';

@Module({
  imports: [ConfigModule, ImageModule, UserModule, AuthModule, MemoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
