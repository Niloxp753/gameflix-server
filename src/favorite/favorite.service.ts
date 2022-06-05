import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: string) {
    return `This action returns a #${id} favorite`;
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  delete(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
