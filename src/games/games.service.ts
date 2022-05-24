import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.games.findMany();
  }

  findOne(id: string): Promise<Game> {
    return this.prisma.games.findUnique({ where: { id } });
  }

  create(dto: CreateGamesDto): Promise<Game> {
    const data: Game = { ...dto };

    return this.prisma.games.create({ data });
  }
}
