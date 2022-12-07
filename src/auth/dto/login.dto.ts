import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nickname do usuário',
    example: 'tatianagandra',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Abcd@1234',
  })
  password: string;

@ApiProperty({
  description: 'user email',
  example: 'tati@blue.com',
})
@IsEmail()
@IsNotEmpty()
email: string;
}