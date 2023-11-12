import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, max } from 'class-validator';

export class AddAddressDto {
    // @ApiProperty({ default: '0234234' })
    // @IsString()
    // @IsNotEmpty()
  userID: string;

  // @ApiProperty({ default: 'Nguyễn Văn Nghĩa' })
  // @IsString()
  // @IsNotEmpty()
  userNameShipping: string;

  // @ApiProperty({ default: '0339549751' })
  // @IsString()
  // @IsNotEmpty()
  Sdt: string;

  // @ApiProperty({ default: 'Xóm 3 thôn 2 Tánh Linh Bình Thuận' })
  // @IsString()
  // @IsNotEmpty()
  address: string;
}
