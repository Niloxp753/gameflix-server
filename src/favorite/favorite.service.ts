import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Favorite[]> {
    return this.prisma.favorite.findMany();
  }

  async findById(id: string): Promise<Favorite> {
    const record = await this.prisma.favorite.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Favorite> {
    return this.findById(id);
  }

  create(dto: CreateFavoriteDto): Promise<Favorite> {
    const data: Favorite = { ...dto };

    return this.prisma.favorite.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateFavoriteDto): Promise<Favorite> {
    await this.findById(id);
    const data: Partial<Favorite> = { ...dto };

    return this.prisma.favorite
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.favorite.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro aconteceu ao executar a operação',
    );
  }
}
