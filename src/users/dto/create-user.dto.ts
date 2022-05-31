import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário. Utilizado no login. Deve ser único',
    example: 'niloxp',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Apenas para exibição',
    example: 'Danilo Diniz',
  })
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem de perfil do usuário',
    example: 'https://avatars.githubusercontent.com/u/97798047',
  })
  image: string;

  @IsNumber()
  @MinLength(14)
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/, {
    message: 'CPF inválido',
  })
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: '999.999.999-99',
  })
  cpf: number;

  @IsString()
  isAdmin: string;
}
