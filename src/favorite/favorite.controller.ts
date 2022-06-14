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
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteService } from './favorite.service';

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
    summary: 'Listar todos os jogos favoritos vinculados ao perfil',
  })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar os jogos favoritos pelo ID vinculados aos perfis',
  })
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo favorito e/ou o perfil pelo ID',
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
    summary: 'Remover um jogo favorito e/ou perfil pelo ID',
  })
  delete(@Param('id') id: string) {
    this.favoriteService.delete(id);
  }
}
