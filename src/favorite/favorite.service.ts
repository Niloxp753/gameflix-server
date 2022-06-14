import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFavoriteDto): Promise<Favorite> {
    const data: Prisma.FavoriteCreateInput = {
      profile: {
        connect: {
          id: dto.profileId,
        },
      },
      games: {
        connect: {
          id: dto.gameId,
        },
      },
    };
    return this.prisma.favorite.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Favorite[]> {
    const favoriteList = await this.prisma.favorite.findMany({
      include: { games: true, profile: true },
    });
    if (favoriteList.length === 0) {
      throw new NotFoundException('Não existem jogos favoritos cadastrados.');
    }
    return favoriteList;
  }

  async findById(id: string): Promise<Favorite> {
    const record = await this.prisma.favorite.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Favorite> {
    await this.findById(id);

    return await this.prisma.favorite.findUnique({
      where: { id },
      include: { games: true, profile: true },
    });
  }

  async update(id: string, dto: UpdateFavoriteDto): Promise<Favorite> {
    await this.findById(id);

    const data: Prisma.FavoriteUpdateInput = {
      profile: {
        connect: {
          id: dto.profileId,
        },
      },
      games: {
        connect: {
          id: dto.gameId,
        },
      },
    };

    return this.prisma.favorite
      .update({
        where: { id },
        data,
        include: {
          games: true,
          profile: true,
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.favorite.delete({ where: { id } });
  }
}
