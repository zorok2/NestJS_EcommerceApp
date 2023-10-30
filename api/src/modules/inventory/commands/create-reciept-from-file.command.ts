/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateReceiptDto, ProductFromFileDto } from '../dto/request/create-reciept.dto';
import { InventoryRepository } from '../repositories/inventory.repository';
import { ProductRepository } from '../../product/repositories/product.repository';
import { ProviderRepository } from '../../product/repositories/provider.repository';
import { ReceiptRepository } from '../repositories/receipt.repository';
import { InventoryReceipt } from '../../../entities/inventory/inventory-receipt.entity';
import { v4 as uuidv4 } from 'uuid';
import { InventoryReceiptDetail } from '../../../entities/inventory/inventory-receipt-detail.entity';
import { Product } from '../../../entities/product/product.entity';
import { ReceiptDetailsRepository } from '../repositories/receipt-detail.repository';

export class CreateReceiptFromFileCommand {
  constructor(
    public readonly products: ProductFromFileDto[],
    public readonly receiptData: CreateReceiptDto,
  ) { }
}

@CommandHandler(CreateReceiptFromFileCommand)
export class CreateReceiptFromFileCommandHandler
  implements ICommandHandler<CreateReceiptFromFileCommand>
{
  private readonly logger = new Logger(
    CreateReceiptFromFileCommandHandler.name,
  );

  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly productRepository: ProductRepository,
    private readonly providerRepository: ProviderRepository,
    private readonly receiptRepostory: ReceiptRepository,
    private readonly decaiptDetailRepository: ReceiptDetailsRepository,
  ) { }

  async execute(command: CreateReceiptFromFileCommand): Promise<any> {
    const inventory = await this.inventoryRepository.findByName(command.receiptData.inventory);
    this.logger.debug(JSON.stringify(inventory));

    const providerStored = await this.providerRepository.findOneByName(command.receiptData.provider);
    this.logger.debug(JSON.stringify(providerStored));

    const receipt = new InventoryReceipt();
    receipt.inventoryReceiptId = uuidv4();
    receipt.createdDate = new Date();
    receipt.status = 'available';
    receipt.userId = 'TEST-USER-ID';
    receipt.inventory = inventory;
    receipt.provider = providerStored;
    await this.receiptRepostory.create(receipt);

    command.products.forEach(async (product) => {

      const receiptDetail = new InventoryReceiptDetail();
      receiptDetail.id = uuidv4();
      receiptDetail.inventoryReceipt = receipt;
      receiptDetail.outDate = new Date();

      // Get product by sku:

      const productInReceipt = new Product();
      productInReceipt.price = product.price;
      productInReceipt.unit = product.unit;
      productInReceipt.productName = product.name;
      productInReceipt.productId = uuidv4();

      productInReceipt.description = '';
      productInReceipt.status = 'Available';
      productInReceipt.urlImageThumb = '';

      productInReceipt.descriptionImageLists = '';
      productInReceipt.quantityStock = 0;

      productInReceipt.createdDate = new Date();
      productInReceipt.updatedDay = new Date();

      const productSaved = await this.productRepository.createProduct(productInReceipt);

      receiptDetail.product = productSaved;
      receiptDetail.quantity = product.actualNumber;

      await this.decaiptDetailRepository.create(receiptDetail);
    });

    return await this.receiptRepostory.findOne(receipt.inventoryReceiptId);
  }
}
