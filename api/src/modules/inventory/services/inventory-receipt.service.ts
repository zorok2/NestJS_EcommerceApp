import { Command } from 'ts-postgres/dist/src/protocol';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InventoryReceipt } from '../../../entities/inventory/inventory-receipt.entity';
import { Inventory } from '../../../entities/inventory/inventory.entity';
import { Injectable } from '@nestjs/common';
import { GetAllReceiptQuery } from '../queries/get-all-receipt.query';
import { GetReceiptByIdQuery } from '../queries/get-receipt-byId.query';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import * as docx from 'docx';
import * as fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';
@Injectable()
export class InventoryReceiptService {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) { }

  async getAllReceipt(): Promise<ResponseBase> {
    const data = await this.query.execute(new GetAllReceiptQuery());
    return new ResponseBase(ResponseStatus.Success, 'Get ID successful', data);
  }

  //todo
  async printReceipt(id) {
    const data = await this.getReceiptById(id);

    // const tableData = [
    //   ['Name', 'Age', 'Email'],
    //   ['John Doe', '30', 'john.doe@example.com'],
    //   ['Jane Smith', '25', 'jane.smith@example.com'],
    //   ['Bob Johnson', '40', 'bob.johnson@example.com'],
    // ];
    // Create a new table with the data
    // const table = new docx.Table({
    //   rows: tableData.map(
    //     (row) =>
    //       new docx.TableRow({
    //         children: row.map(
    //           (cellData) =>
    //             new docx.TableCell({
    //               children: [new Paragraph(cellData)],
    //             }),
    //         ),
    //       }),
    //   ),
    // });
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Hello World'),
                new TextRun({
                  text: 'Foo Bar',
                  bold: true,
                }),
                new TextRun({
                  text: '\tGithub is the best',
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });
    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync('MyDocument.docx', buffer);
    });

    return data;
  }

  async getReceiptById(id): Promise<any> {
    let receipt;
    try {
      receipt = await this.query.execute(new GetReceiptByIdQuery(id));
      if (!receipt) {
        return new ResponseBase(
          ResponseStatus.Failure,
          'ID not found',
          receipt,
        );
      }
      return new ResponseBase(
        ResponseStatus.Success,
        'Get ID successful',
        receipt,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  createReceipt(receipt) {
    // todo
  }
}
