/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProviderDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'ProviderName' })
  @Column()
  providerName: string;
}

export class UpdateProviderDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'Provider name' })
  @Column()
  providerName: string;
}
