import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.games.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  create(dto: CreateGamesDto): Promise<Game> {
    const data: Game = { ...dto };

    return this.prisma.games.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateGamesDto): Promise<Game> {
    await this.findById(id);
    const data: Partial<Game> = { ...dto };

    return this.prisma.games
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.games.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro aconteceu ao executar a operação',
    );
  }
}
