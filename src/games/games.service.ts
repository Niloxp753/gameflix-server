import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';

@Injectable()
export class GamesService {
  findAll() {
    return 'Buscar todos os jogos';
  }

  create(createGamesDto: CreateGamesDto) {
    return 'Criar um jogo' + JSON.stringify(createGamesDto);
  }
}
