import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MemoryModule } from '../memory/memory.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, MemoryModule, AiModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
