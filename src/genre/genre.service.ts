import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateGenreDto): Promise<Genre> {
    const data: Prisma.GenreCreateInput = { name: dto.name };

    return await this.prisma.genre.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<Genre[]> {
    const genreList = await this.prisma.genre.findMany();

    if (genreList.length === 0) {
      throw new NotFoundException('Não existe gêneros cadastrados.');
    }

    return genreList;
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Genre> {
    await this.findById(id);

    return await this.prisma.genre.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(id);
    const data: Partial<Genre> = { ...dto };

    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genre.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro aconteceu ao executar a operação',
    );
  }
}
