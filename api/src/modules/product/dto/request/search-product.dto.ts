import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchProductDto {
  @ApiProperty({ default: 'Product name' })
  name: string;

  @ApiProperty({ default: '493865a4-f0af-4bbe-83a9-097e8ad7fdd8' })
  categoryId: string;
}
export class GetProductByIdDto {
  @IsNotEmpty()
  @ApiProperty({ default: '01538b5d-2924-431c-80c0-fb8302fb1ea1' })
  id: string;
}
