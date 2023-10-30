import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissonDto {
  @ApiProperty({ default: 'Admin' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
