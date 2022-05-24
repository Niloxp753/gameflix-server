import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGendersDto } from './dto/create-genders.dto';
import { GendersService } from './genders.service';
@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateGendersDto) {
    return this.gendersService.create(dto);
  }
}
