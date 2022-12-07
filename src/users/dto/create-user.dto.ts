import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreatUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'tatiana',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'tatiana@blue.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password, containing an uppercase letter, lowercase letter, number and a character',
    example: 'tat@1234',
  })
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  password: string;

@ApiProperty()
@IsString()
cpf: string;

@ApiProperty()
@IsString()
role: string;
}