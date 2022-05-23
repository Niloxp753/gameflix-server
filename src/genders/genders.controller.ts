import { Controller, Get } from '@nestjs/common';

@Controller('genders')
export class GendersController {
  @Get()
  findAll() {
    return 'Buscar todos os gêneros';
  }
}
