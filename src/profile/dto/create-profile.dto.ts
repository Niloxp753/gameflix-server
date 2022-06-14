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
    example: 'b36a6d81-66bc-40bf-a8a9-9b17cb2e7d75',
  })
  gameId?: string;
}
