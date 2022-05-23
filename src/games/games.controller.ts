import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Post()
  create(@Body() createGamesDto: CreateGamesDto) {
    return this.gamesService.create(createGamesDto);
  }
}
