import { Controller, Get, Post } from '@nestjs/common';

@Controller('games')
export class GamesController {
  @Get()
  findAll() {
    return 'Buscar todos os jogos';
  }

  @Post()
  create() {
    return 'Criar um jogo';
  }
}
