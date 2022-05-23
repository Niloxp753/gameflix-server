import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGendersDto } from './dto/create-genders.dto';
import { GendersService } from './genders.service';

@Controller('genders')
export class GendersController {
  constructor(private gendersService: GendersService) {}

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Post()
  create(@Body() createGendersDto: CreateGendersDto) {
    return this.gendersService.create(createGendersDto);
  }
}
