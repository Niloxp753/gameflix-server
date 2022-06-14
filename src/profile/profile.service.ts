import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        games: true,
      },
    });
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
    return this.findById(id);
  }

  create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return this.prisma.profile
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
        .catch(this.handleError);
    } else {
      return this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(this.handleError);
    }
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
          .catch(this.handleError);
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
          .catch(this.handleError);
      }
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro aconteceu ao executar a operação',
    );
  }
}
