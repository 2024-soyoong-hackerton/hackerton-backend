import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MemoryModule } from '../memory/memory.module';
import { MemoryService } from '../memory/memory.service';

@Module({
  imports: [PrismaModule, MemoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
