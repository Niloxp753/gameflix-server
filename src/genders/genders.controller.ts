import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGendersDto } from './dto/create-genders.dto';
import { UpdateGendersDto } from './dto/update-genders.dto';
import { Gender } from './entities/genders.entity';
import { GendersService } from './genders.service';
@ApiTags('genders')
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
  create(@Body() dto: CreateGendersDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Gênero pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGendersDto,
  ): Promise<Gender> {
    return this.gendersService.update(id, dto);
  }
}
