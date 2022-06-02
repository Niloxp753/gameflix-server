import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GendersController } from './gender.controller';
import { GendersService } from './gender.service';

@Module({
  imports: [PrismaModule],
  controllers: [GendersController],
  providers: [GendersService],
})
export class GendersModule {}
