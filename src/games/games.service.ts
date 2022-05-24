import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
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

  update(id: string, dto: UpdateGamesDto): Promise<Game> {
    const data: Partial<Game> = { ...dto };

    return this.prisma.games.update({
      where: { id },
      data,
    });
  }
}
