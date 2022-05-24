import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGendersDto } from './dto/create-genders.dto';
import { UpdateGendersDto } from './dto/update-genders.dto';
import { Gender } from './entities/genders.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.genders.findMany();
  }

  findOne(id: string): Promise<Gender> {
    return this.prisma.genders.findUnique({ where: { id } });
  }

  create(dto: CreateGendersDto): Promise<Gender> {
    const data: Gender = { ...dto };

    return this.prisma.genders.create({ data });
  }

  update(id: string, dto: UpdateGendersDto): Promise<Gender> {
    const data: Partial<Gender> = { ...dto };

    return this.prisma.genders.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.genders.delete({ where: { id } });
  }
}
