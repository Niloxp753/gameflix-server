import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async findAll(user: User) {
    const profileList = await this.prisma.profile.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        imageURL: true,
        title: true,
      },
    });

    if (profileList.length === 0) {
      throw new NotFoundException(
        'Não existem perfis cadastrados para esse usuário.',
      );
    }
    return profileList;
  }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        games: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    await this.findById(id);

    return await this.prisma.profile.findUnique({
      where: { id },
      select: {
        title: true,
        imageURL: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: { select: { games: true } },
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const profileUser = await this.findById(id);

    if (dto.gameId) {
      let existGame = false;
      profileUser.games.map((game) => {
        if (game.id == dto.gameId) {
          existGame = true;
        }
      });
      console.log(existGame);
      if (existGame) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageURL: dto.imageURL,
              userId: userId,
              games: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: {
              games: true,
            },
          })
          .catch(handleError);
      } else {
        console.log('rodou');
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageURL: dto.imageURL,
              userId: userId,
              games: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: {
              games: true,
            },
          })
          .catch(handleError);
      }
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
