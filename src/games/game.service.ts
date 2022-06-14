import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto): Promise<Game> {
    const data: Prisma.GameCreateInput = {
      genre: {
        connectOrCreate: {
          create: { name: dto.genre },
          where: { name: dto.genre },
        },
      },
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
    };

    return await this.prisma.game.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Game[]> {
    const gameList = await this.prisma.game.findMany({
      include: {
        genre: true,
      },
    });
    if (gameList.length === 0) {
      throw new NotFoundException('Não existem jogos cadastrados.');
    }
    return gameList;
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    await this.findById(id);

    return await this.prisma.game.findUnique({
      where: { id },
      include: { genre: true },
    });
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);
    const data: Prisma.GameUpdateInput = {
      genre: {
        connectOrCreate: {
          create: { name: dto.genre },
          where: { name: dto.genre },
        },
      },
    };

    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.game.delete({ where: { id } });
  }
}
