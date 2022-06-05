import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'O nome do gênero',
    example: 'Aventura',
  })
  name: string;
}
