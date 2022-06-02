import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        games: true,
      },
    });
  }

  async findById(id: string): Promise<Profile> {
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

  async findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  create(dto: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile
      .create({ data: dto, include: { games: true } })
      .catch(this.handleError);
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findById(id);

    return this.prisma.profile
      .update({
        where: { id },
        data: dto,
        include: {
          games: true,
        },
      })
      .catch(this.handleError);
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
