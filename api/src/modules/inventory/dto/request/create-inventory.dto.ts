import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ default: 'HaNoi WareHouse' })
  @IsString()
  @IsNotEmpty()
  inventoryName: string;

  @ApiProperty({
    default: '301 P. Tôn Đức Thắng, Hàng Bột, Đống Đa, Hà Nội, Việt Nam',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
