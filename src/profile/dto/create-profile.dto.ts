import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

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

  @IsString()
  @ApiProperty({
    description: 'Id do jogo',
    example: '9c14d4fb-7c67-46b1-b383-66fc226fce00',
  })
  gameId?: string;
}
