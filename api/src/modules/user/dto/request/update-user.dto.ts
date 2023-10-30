/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Address, Permission } from 'src/entities/user/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'johnlebee' })
  username: string;

  @ApiProperty({ default: 'john mark' })
  @IsString()
  fullname: string;

  @ApiProperty({ default: 'john.doe@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ default: '123456789' })
  @IsString()
  phone: string;

  // @ApiProperty()
  // addresses: Address[];
}

export class ChangePassWordDto {
  @IsNotEmpty()
  @ApiProperty({ default: '4a87c759-94c5-4de2-b1d9-b606df4fe452' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  pass: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'newpassword' })
  newPass: string;
}

export class ChangePermissionDto {
  @IsNotEmpty()
  @ApiProperty({ default: '4a87c759-94c5-4de2-b1d9-b606df4fe452' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  permission: Permission;
}
