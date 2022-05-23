import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  findAll() {
    return 'Buscar todos os jogos';
  }

  create() {
    return 'Criar um jogo';
  }
}
