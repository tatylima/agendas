import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'nome do produto',
    example: ' Ano Novo 2023',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'descrição do produto',
    example:
      'Agenda de 2023',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'preço do produto',
    example: 25.45,
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  @ApiProperty({
    description: 'imagem do produto',
    example:
      ' https:',
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'foreign key, get from category',
    example: 'd298b53a-e44e-4eda-a248-66dd0f361e4d',
  })
  @IsUUID()
  categoryId: string;
}