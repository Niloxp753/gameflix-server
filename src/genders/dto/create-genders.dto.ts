import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGendersDto {
  @IsString()
  @ApiProperty({
    description: 'O nome do gênero',
    example: 'Ação',
  })
  name: string;
}
