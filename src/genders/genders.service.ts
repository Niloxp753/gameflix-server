import { Injectable } from '@nestjs/common';
import { CreateGendersDto } from './dto/create-genders.dto';
import { Gender } from './entities/genders.entity';

@Injectable()
export class GendersService {
  genders: Gender[] = [];

  findAll() {
    return 'Buscar todos os gêneros';
  }

  create(createGendersDto: CreateGendersDto) {
    const gender: Gender = { id: 'random_id', ...createGendersDto };

    this.genders.push(gender);

    return gender;
  }
}
