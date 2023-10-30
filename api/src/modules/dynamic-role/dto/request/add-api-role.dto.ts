import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { HttpMethodEntity } from 'src/entities/api-role/dynamic-role.entity';

export class CreateApiRoleDto {
  @ApiProperty({ default: 'POST' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(HttpMethodEntity)
  method: HttpMethodEntity;

  @ApiProperty({ default: '/api/v1/product' })
  @IsString()
  @IsNotEmpty()
  apiEndpoint: string;

  @ApiProperty({ default: 'Inventory Service' })
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty({ default: 'Creates a new user with the given data' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ default: 'uuid' })
  @IsString()
  @IsNotEmpty()
  rolesId: string[];
}

// [{"method":"POST", "apiEndpoint": "/api/v1/product","rolesId":["123"]}];
