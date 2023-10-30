export class CreateReceiptDto {
  inventory: string;
  provider: string;
  desc: any;
}

export enum ExcelColumn {
  index = 'SỐ THỨ TỰ',
  name = 'TÊN SẢN PHẨM',
  id = 'SKU',
  unit = 'ĐƠN VỊ TÍNH',
  numOfItem = 'SỐ LƯỢNG CHỨNG TỪ',
  actualNumber = 'SỐ LƯỢNG NHẬP',
  price = 'ĐƠN GIÁ',
}

export const ExcellRequireColumns = [
  ExcelColumn.id,
  ExcelColumn.index,
  ExcelColumn.name,
  ExcelColumn.unit,
  ExcelColumn.numOfItem,
  ExcelColumn.actualNumber,
  ExcelColumn.price,
];

export class ProductFromFileDto {
  id: string;
  index: string;
  name: string;
  unit: string;
  numOfItem: number;
  actualNumber: number;
  price: number;

  constructor(data: any) {
    this.id = data[ExcelColumn.id];
    this.index = data[ExcelColumn.index];
    this.name = data[ExcelColumn.name];
    this.unit = data[ExcelColumn.unit];
    this.numOfItem = data[ExcelColumn.numOfItem];
    this.actualNumber = data[ExcelColumn.actualNumber];
    this.price = data[ExcelColumn.price];
  }
}

export class ReceiptDto {
  inventory: string;
  provider: string;
  desc: string;
}
