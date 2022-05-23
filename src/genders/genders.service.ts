import { Injectable } from '@nestjs/common';
import { CreateGendersDto } from './dto/create-genders.dto';

@Injectable()
export class GendersService {
  findAll() {
    return 'Buscar todos os gêneros';
  }

  create(createGendersDto: CreateGendersDto) {
    return 'Criar um gênero: ' + JSON.stringify(createGendersDto);
  }
}
