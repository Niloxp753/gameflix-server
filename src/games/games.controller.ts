import { Controller, Get } from '@nestjs/common';

@Controller('games')
export class GamesController {
  @Get()
  findAll() {
    return 'Buscar todos os jogos';
  }
}
