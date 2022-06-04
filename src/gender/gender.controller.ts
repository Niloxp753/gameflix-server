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
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
import { GendersService } from './gender.service';
@ApiTags('genders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros',
  })
  findAll(): Promise<Gender[]> {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um Gênero',
  })
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.gendersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um Gênero',
  })
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Gênero pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.gendersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um Gênero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.gendersService.delete(id);
  }
}
