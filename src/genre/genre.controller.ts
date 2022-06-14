import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genre.service';
@ApiTags('genders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('genders')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um Gênero',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genresService.create(user, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros',
  })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um Gênero',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Gênero pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto): Promise<Genre> {
    return this.genresService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um Gênero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.genresService.delete(id);
  }
}
