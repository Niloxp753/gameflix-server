import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('favorite')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um jogo favorito',
  })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos favoritos',
  })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo favorito pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo favorito pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um jogo favorito pelo ID',
  })
  delete(@Param('id') id: string) {
    this.favoriteService.delete(id);
  }
}
