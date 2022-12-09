import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class createProfileDto {
  @IsString()
  @ApiProperty({
    description: 'O nome usado para o perfil',
    example: 'TatianaGandra123',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'ID do Usuario(admin)',
    example: 'f7f45b19-bb7c-4f0d-87ea-f0d3c04423b5',
  })
  userId: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do Perfil',
    example: 'https://avatars.githubusercontent.com/u/97984721?s=400&u=c611aadf5b37eadeb851c125d233ad670af240a4&v=4',
  })
  image: string;

  productId?: string;
}
