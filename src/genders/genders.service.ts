import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGendersDto } from './dto/create-genders.dto';
import { Gender } from './entities/genders.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.genders.findMany();
  }

  create(dto: CreateGendersDto) {
    const data: Gender = { ...dto };

    return this.prisma.genders.create({ data });
  }
}
