import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { CreatePermissonDto } from '../dto/request/create-permission.dto';

@ApiTags('Permission Endpoint')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: '[[ADMIN]] Only Admin can create permission',
    description: 'Admin can create new Permission',
  })
  @Post()
  async create(@Body() createPermissonDto: CreatePermissonDto) {
    return await this.permissionService.create(createPermissonDto);
  }

  @ApiOperation({
    summary: '[[ADMIN]] Only Admin can get permission',
    description: 'Admin can get new Permission',
  })
  @Get()
  async getAllPermission() {
    return await this.permissionService.getAllPermission();
  }

  @ApiOperation({
    summary: '[[ADMIN]] Only Admin can get permission',
    description: 'Admin can get new Permission',
  })
  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    return await this.permissionService.getPermissionById(id);
  }

  @ApiOperation({
    summary: '[[ADMIN]] Only Admin can invalid permission',
    description: 'Admin can invalid Permission',
  })
  @Delete(':id')
  async invalidPermissionById(@Param('id') id: string) {
    return await this.permissionService.invalidPermissionById(id);
  }

  @ApiOperation({
    summary: '[[ADMIN]] Only Admin can active permission',
    description: 'Admin can active Permission',
  })
  @Put(':id')
  async activePermissionById(@Param('id') id: string) {
    return await this.permissionService.activePermissionById(id);
  }
}
