/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { ExportDetailService } from '../services/export-detail.service';
//import * as ObjectsToCsv from 'objects-to-csv';
import * as docx from 'docx';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { WordService } from 'src/shared/file-upload/word/word.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Inventory Endpoint')
@Controller('/inventory/export-detail')
export class ExportDetailController {
  constructor(
    private readonly exportDetailService: ExportDetailService,
    private readonly wordService: WordService,
  ) {}
  private readonly logger = new Logger(ExportDetailController.name);

  //TODO Query
  //Get Export Detail By Id
  @Get(':id')
  async getExportDetailByExportId(@Param('id') id: string) {
    const result = await this.exportDetailService.getExportDetailByExportId(id);
    return result;
  }

  @Get('/print/:id')
  async findAll(@Param('id') id: string) {
    const exportDetail =
      await this.exportDetailService.getExportDetailByExportIdToPrint(id);
    const result = await this.wordService.createFile(exportDetail);
    return result;
  }
}
