import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.genders.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  create(dto: CreateGendersDto): Promise<Gender> {
    const data: Gender = { ...dto };

    return this.prisma.genders.create({ data });
  }

  async update(id: string, dto: UpdateGendersDto): Promise<Gender> {
    await this.findById(id);
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
