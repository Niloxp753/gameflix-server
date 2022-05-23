import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';

@Module({
  controllers: [GamesController],
  providers: [],
})
export class GamesModule {}
