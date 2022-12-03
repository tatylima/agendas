import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'name of the category that will receive several products',
    example: 'engine',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}