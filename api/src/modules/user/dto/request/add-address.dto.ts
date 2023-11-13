import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, max } from 'class-validator';

export class AddAddressDto {
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  userNameShipping: string;

  @IsNotEmpty()
  Sdt: string;

  @IsNotEmpty()
  address: string;
}
