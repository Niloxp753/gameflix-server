import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';

@Module({
  imports: [PrismaModule],
  controllers: [GendersController],
  providers: [GendersService],
})
export class GendersModule {}
