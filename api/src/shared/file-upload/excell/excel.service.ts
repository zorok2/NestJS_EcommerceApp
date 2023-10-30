/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class ExcelService {
  public getDataObject = (
    excelFile: Express.Multer.File,
    header: string[],
  ): Promise<any[]> => {
    const workbook = xlsx.read(excelFile.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const headerRow = rows[0] as string[];

    // Check if any required column is missing
    const missingColumns = header.filter(
      (column) => !headerRow.includes(column),
    );

    if (missingColumns.length > 0) {
      return Promise.reject(
        new Error(
          `Excel file is missing the following columns: ${missingColumns.join(
            ', ',
          )}`,
        ),
      );
    }

    const columnIndexes = headerRow.reduce((acc, column, index) => {
      if (header.includes(column)) {
        return { ...acc, [column]: index };
      }
      return acc;
    }, {});

    const dataRows = rows.slice(1);

    const products = dataRows.map((row) => {
      const product = header.reduce((acc, column) => {
        const index = columnIndexes[column];
        return { ...acc, [column]: row[index] };
      }, {});

      return product;
    });

    return Promise.resolve(products);
  };
}
