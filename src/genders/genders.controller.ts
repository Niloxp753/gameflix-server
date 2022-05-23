import { Controller, Get, Post } from '@nestjs/common';
import { GendersService } from './genders.service';

@Controller('genders')
export class GendersController {
  constructor(private gendersService: GendersService) {}

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Post()
  create() {
    return this.gendersService.create();
  }
}
