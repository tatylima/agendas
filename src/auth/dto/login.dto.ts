import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email da conta',
    example: 'tatianagandra@gmail.com'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'senha da conta',
    example: 'Abcd@1234'
  })
  password: string;
}