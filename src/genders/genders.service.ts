import { Injectable } from '@nestjs/common';

@Injectable()
export class GendersService {
  findAll() {
    return 'Buscar todos os gêneros';
  }

  create() {
    return 'Criar um gênero';
  }
}
