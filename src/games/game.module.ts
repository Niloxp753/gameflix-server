import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GamesController } from './game.controller';
import { GamesService } from './game.service';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
