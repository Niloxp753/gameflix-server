import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.games.findMany();
  }

  create(dto: CreateGamesDto) {
    const data: Game = { ...dto };

    return this.prisma.games.create({ data });
  }
}
