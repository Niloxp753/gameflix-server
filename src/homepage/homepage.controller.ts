import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';

@ApiTags('homepage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Página inicial de jogos do perfil',
  })
  findById(@Param('id') id: string) {
    return this.homepageService.findById(id);
  }
}
