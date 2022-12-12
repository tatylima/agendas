import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsPositive,IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Personalizado',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  
 
  @ApiProperty({
    description: 'Descrição do produto',
    example:
      'Produto para anotação',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @ApiProperty({
    description: 'Preço do produto',
    example: 22.34,
  })
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do produto',
    example: '2019',
  })
  year: number;

  @IsString()
  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Corrida',
  })
  categoryName: string;


  @IsUrl()
  @ApiProperty({
    description: 'Imagem do produto',
    example: 'https://http2.mlstatic.com/D_NQ_NP_878715-MLB50163998856_062022-O.webp',
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