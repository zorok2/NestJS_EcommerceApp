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

@Injectable()
export class ExportDetailService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly wordService: WordService,
  ) {}
  private readonly logger = new Logger(ExportDetailService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getExportDetailByExportId(id: string): Promise<ResponseBase> {
    try {
      this.logger.debug('GET EXPORT DETAIL ID');
      const result = await this.queryBus.execute(new GetExportDetailQuery(id));
      console.log('result ' + JSON.stringify(result));
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get InventoryExport Detail Success',
        result,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getExportDetailByExportIdToPrint(
    id: string,
  ): Promise<InventoryExportDetail[]> {
    const result = await this.queryBus.execute(
      new GetExportDetailToPrintQuery(id),
    );
    // const doc = await this.wordService.createFile(result);

    // // Set the appropriate headers to trigger a download in the user's browser
    // const fileName = `users-${Date.now()}.docx`;

    // // Generate the file path for the document
    // const filePath = path.join(process.env.HOME, 'Documents', fileName);

    // // Write the document to disk
    // const buffer = await docx.Packer.toBuffer(doc);
    // fs.writeFileSync(filePath, buffer);
    // // Send the file as a download in the user's browser
    // //response.download(filePath, fileName);

    return result;
  }
}
