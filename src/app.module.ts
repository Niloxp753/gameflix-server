import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GendersModule } from './genders/genders.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GamesModule, GendersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
