/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';
import * as docx from 'docx';
import * as path from 'path';
import * as fs from 'fs';
import { ResponseStatus, ResponseBase } from 'src/shared/payload/response-base';

@Injectable()
export class WordService {
  constructor() {}

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async createFile(exportDetail: InventoryExportDetail[]) {
    try {
      if (!exportDetail) {
        throw new Error('Export Detail null');
      }
      const tableRows = exportDetail.map((exportDetail) => {
        return new docx.TableRow({
          children: [
            new docx.TableCell({
              children: [
                new docx.Paragraph(exportDetail.product.productName.toString()),
              ],
            }),
            new docx.TableCell({
              children: [
                new docx.Paragraph(exportDetail.product.unit.toString()),
              ],
            }),
            new docx.TableCell({
              children: [new docx.Paragraph(exportDetail.quantity.toString())],
            }),
          ],
        });
      });

      // Create a table with the user data
      const table = new docx.Table({
        rows: [
          new docx.TableRow({
            children: [
              new docx.TableCell({
                children: [new docx.Paragraph('Tên sản phẩm')],
              }),
              new docx.TableCell({
                children: [new docx.Paragraph('Đơn vị tính')],
              }),
              new docx.TableCell({
                children: [new docx.Paragraph('Số lượng')],
              }),
            ],
            cantSplit: true,
          }),
          ...tableRows,
        ],
        width: {
          size: 100,
          type: docx.WidthType.AUTO,
        },
      });

      // Create a document with the table
      const doc = new docx.Document({
        sections: [
          {
            children: [
              new docx.Paragraph({
                text: 'Đơn vị xuất kho: ',
                alignment: docx.AlignmentType.LEFT,

                //text: 'Mẫu số 02 - VT'
                //heading: docx.HeadingLevel.HEADING_1,
              }),
              new docx.Paragraph({
                text: 'Phiếu xuất kho',
                alignment: docx.AlignmentType.CENTER,
                //heading: docx.HeadingLevel.HEADING_1,
              }),
              new docx.Paragraph({
                text: 'Users',
                heading: docx.HeadingLevel.HEADING_1,
              }),
              table,
            ],
          },
        ],
      });

      const fileName = `users-${Date.now()}.docx`;
      if (fileName) {
        // Generate the file path for the document
        const filePath = path.join(process.env.HOME, 'Documents', fileName);

        // Write the document to disk
        const buffer = await docx.Packer.toBuffer(doc);
        fs.writeFileSync(filePath, buffer);
      }

      return doc;
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
