import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.games.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
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

  async delete(id: string) {
    await this.prisma.games.delete({ where: { id } });
  }
}
