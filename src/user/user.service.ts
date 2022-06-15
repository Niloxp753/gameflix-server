import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/is-admin.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private userSelect = {
    id: true,
    name: true,
    password: false,
    cpf: false,
    email: true,
    image: true,
    createdAt: true,
    updatedAt: true,
    isAdmin: true,
  };

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const user: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      isAdmin: dto.isAdmin,
    };

    return this.prisma.user
      .create({
        data: user,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async findAll(user: User) {
    isAdmin(user);

    const userList = await this.prisma.user.findMany({
      select: this.userSelect,
    });

    if (userList.length === 0) {
      throw new NotFoundException('Não existem usuários cadastrados.');
    }
    return userList;
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(user: User, id: string) {
    isAdmin(user);
    await this.findById(id);

    return await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  async update(user: User, id: string, dto: UpdateUserDto): Promise<User> {
    isAdmin(user);
    await this.findById(id);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(user: User, id: string) {
    isAdmin(user);
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
