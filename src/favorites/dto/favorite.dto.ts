import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FavoriteproductDto {
    @IsUUID()
    @ApiProperty({
      description: 'id user for produtc favorite',
      example: 'ed7bf0ca-394c-4a4a-b909-f442219372c5',
    })
    userId: string;
  
    @IsString()
    @ApiProperty({
      description: 'name for favorite product',
      example: 'toothed belt',
    })
    productName: string;
  }