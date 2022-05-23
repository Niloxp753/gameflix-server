import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { Games } from './entities/games.entity';

@Injectable()
export class GamesService {
  game: Games[] = [];

  findAll() {
    return 'Buscar todos os jogos';
  }

  create(createGamesDto: CreateGamesDto) {
    const games: Games = { id: 'random_id', ...createGamesDto };

    this.game.push(games);

    return games;
  }
}
