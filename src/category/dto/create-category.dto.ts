import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'nome da categoria do produto',
    example: 'agendas femininas',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}