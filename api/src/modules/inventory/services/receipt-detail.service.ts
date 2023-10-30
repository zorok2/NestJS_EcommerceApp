import { Logger } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import {
  GetExportDetailQuery,
  GetExportDetailToPrintQuery,
} from '../queries/export-detail.query';
import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';
import { WordService } from 'src/shared/file-upload/word/word.service';
import path from 'path';
import * as docx from 'docx';
import * as fs from 'fs';
import { response } from 'express';
import { GetReceiptDetailByIdQuery } from '../queries/get-receipt-detail-byId.query';

@Injectable()
export class ReceiptDetailService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly wordService: WordService,
  ) {}
  private readonly logger = new Logger(ReceiptDetailService.name);

  async getReceiptDetailById(id) {
    return this.queryBus.execute(new GetReceiptDetailByIdQuery(id));
  }
}
