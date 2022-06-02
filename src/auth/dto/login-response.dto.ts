import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlsby5kaW5pejIwMDlAZ21haWwuY29tIiwiaWF0IjoxNjU0MTQ1NzE3LCJleHAiOjE2NTQyMzIxMTd9.0CNEke2r9pqKjyLnj2e_A_k0thMl00-q7XUhYSQQBgU',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
  })
  user: User;
}
