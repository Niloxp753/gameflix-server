import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'O título do jogo',
    example: 'God Of War',
  })
  Title: string;
  @IsString()
  @ApiProperty({
    description: 'A imagem do jogo',
    example: 'https://images6.alphacoders.com/900/900070.jpg',
  })
  CoverImageUrl: string;
  @IsString()
  @ApiProperty({
    description: 'A descrição do jogo',
    example:
      'Baseada em distintas mitologias, a história segue Kratos, um guerreiro espartano que foi levado a matar sua família por seu antigo mestre, o deus da guerra Ares.',
  })
  Description: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'O ano do jogo',
    example: 2018,
  })
  Year: number;
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'O ranking do jogo de 0 a 5',
    example: 5,
  })
  ImdbScore: number;
  @IsString()
  @ApiProperty({
    description: 'O Trailer do jogo',
    example: 'https://youtu.be/FyIwEFXOcaE',
  })
  TrailerYoutubeUrl: string;
  @IsString()
  @ApiProperty({
    description: 'O vídeo de alguém jogando o jogo',
    example: 'https://youtu.be/Wf5tpMhziII',
  })
  GameplayYoutubeUrl: string;
}
