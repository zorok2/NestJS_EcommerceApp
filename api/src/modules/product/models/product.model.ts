/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
export enum ProductStatus {
  Available,
  SoldOut,
  UnAvailable,
  Importing,
}
export class ProductModel {
  id: string;
  categoryId: string;
  productType: string;
  providerId: string;
  name: string;
  price: number;
  importPrice: number;
  unit: string;
  quantity: number;
  quantityStock: number;
  status: ProductStatus;
  thumbnail: string;
  images: string[];
  description: string;
  createdDate: Date;
  updatedDate: Date;

  public constructor(
    name: string,
    categoryId: string,
    productTypeId: string,
    providerId: string,
    price: number,
    importPrice: number,
    unit: string,
    quantity: number,
    thumbnail: string,
    images: string[],
    quantityStock: number,
    desc: any,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.categoryId = categoryId;
    this.providerId = productTypeId;
    this.providerId = providerId;
    this.price = price;
    this.importPrice = importPrice;
    this.unit = unit;
    this.quantity = quantity;
    this.quantityStock = quantityStock;
    this.status = ProductStatus.Available;
    this.thumbnail = thumbnail;
    this.images = images;
    this.description = desc;
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }

  public update = (newData: Partial<ProductModel>): void => {
    Object.assign(this, newData);
    this.updatedDate = new Date();
  };

  public static getProductListFromFile = (): Promise<ProductModel[]> => {
    // handle upload get product fom file;
    return Promise.reject(new Error('Get Product List From File Excel'));
  };

  public uploadImage(thumbnail: File, images: File[]) {
    // Handle upload image;
    return Promise.reject(
      new Error('Handle Upload image to filebase then return url'),
    );
  }
}
