import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateApiRoleDto } from '../dto/request/add-api-role.dto';
import { DynamicApiRoleService } from '../services/dynamic-role.service';
import { ResponseBase } from 'src/shared/payload/response-base';

@Controller('dynamic-api-roles')
export class DynamicApiRoleController {
  private readonly logger = new Logger(DynamicApiRoleController.name);
  constructor(private readonly dynamicApiRoleService: DynamicApiRoleService) {}

  @Get()
  async findAll(): Promise<ResponseBase> {
    return this.dynamicApiRoleService.findAll();
  }

  @Post()
  async create(
    @Body() dynamicApiRole: CreateApiRoleDto[],
  ): Promise<ResponseBase> {
    this.logger.debug(JSON.stringify(dynamicApiRole));
    return this.dynamicApiRoleService.create(dynamicApiRole);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseBase> {
    return await this.dynamicApiRoleService.delete(id);
  }
}
