import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Título do perfil',
    example: 'Kids',
  })
  title: string;

  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'Imagem do perfil',
    example:
      'https://w7.pngwing.com/pngs/750/504/png-transparent-children-s-games-cartoon-children-playing-game-child-reading-thumbnail.png',
  })
  imageURL: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'ID do jogo no perfil',
    example: '18a6212f-1165-4ff2-b33b-caaf8c50e2ac',
  })
  gameId: string;
}
