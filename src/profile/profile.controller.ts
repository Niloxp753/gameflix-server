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
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profile.service';

@ApiTags('profile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(user.id, createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll(@Param('userId') id: string) {
    return this.profilesService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(user.id, id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um perfil pelo ID',
  })
  delete(@Param('id') id: string) {
    this.profilesService.delete(id);
  }
}
