import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'O título do jogo',
    example: 'God Of War',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'A imagem do jogo',
    example:
      'https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1642526157',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'A descrição do jogo',
    example:
      'Baseada em distintas mitologias, a história segue Kratos, um guerreiro espartano que foi levado a matar sua família por seu antigo mestre, o deus da guerra Ares.',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'O ano do jogo',
    example: 2018,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'O ranking do jogo de 0 a 5',
    example: 5,
  })
  imdbScore: number;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'O Trailer do jogo',
    example: 'https://youtu.be/FyIwEFXOcaE',
  })
  trailerYoutubeUrl: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'O vídeo de alguém jogando o jogo',
    example: 'https://youtu.be/Wf5tpMhziII',
  })
  gameplayYoutubeUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Gênero dos jogos',
    example: 'Aventura',
  })
  genre: string;
}
