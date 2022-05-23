import { Controller, Get, Post } from '@nestjs/common';

@Controller('genders')
export class GendersController {
  @Get()
  findAll() {
    return 'Buscar todos os gêneros';
  }

  @Post()
  create() {
    return 'Criar um gênero';
  }
}
