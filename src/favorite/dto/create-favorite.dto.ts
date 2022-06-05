import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @ApiProperty({
    description: 'O ID do jogo',
    example: 'b36a6d81-66bc-40bf-a8a9-9b17cb2e7d75',
  })
  gameId: string;

  @IsString()
  @ApiProperty({
    description: 'O ID do perfil',
    example: '7214c0e0-82d8-48d2-a74a-dc7f3a42705b',
  })
  profileId: string;
}
