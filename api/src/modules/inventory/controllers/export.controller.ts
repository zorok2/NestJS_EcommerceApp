/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { InventoryExportService } from '../services/export.service';
import path from 'path';
import * as fs from 'fs';
import { ExportDetailService } from '../services/export-detail.service';
import { CreateExportDto } from '../dto/request/create-export.dto';
import { ApiTags } from '@nestjs/swagger';

//const templatePath = path.join(__dirname, '..', 'templates', 'template.docx');
@ApiTags('Inventory Endpoint')

@Controller('/inventory/export')
export class ExportController {
  constructor(
    private readonly exportService: InventoryExportService,
    private readonly exportDetailService: ExportDetailService,
  ) {}

  @Get()
  async getAllExport(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const result = await this.exportService.getList(+page, +pageSize);
    return result;
  }

  @Get(':id')
  async getExport(@Param('id') id: string) {
    const result = await this.exportService.getExportById(id);
    return result;
  }

  @Post()
  async create(@Body() data: CreateExportDto) {
    return this.exportService.createExport(data);
  }
}
