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
  @ApiProperty({
    description: 'Imagem do perfil',
    example:
      'https://w7.pngwing.com/pngs/750/504/png-transparent-children-s-games-cartoon-children-playing-game-child-reading-thumbnail.png',
  })
  imageURL: string;
}
