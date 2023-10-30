import { InventoryRepository } from '../repositories/inventory.repository';
import { ExportRepository } from '../repositories/export.repository';
import { CreateCategoryCommand } from '../../product/commands/category.command';
import { CommandHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreateExportDto } from '../dto/request/create-export.dto';
import { InventoryExport } from 'src/entities/inventory/inventory-export.entity';
import { v4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { InventoryReceiptDetail } from 'src/entities/inventory/inventory-receipt-detail.entity';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ReceiptRepository } from '../repositories/receipt.repository';
import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';
import { ProviderRepository } from 'src/modules/product/repositories/provider.repository';
import { ExportDetailRepository } from '../repositories/export-detail.repository';

export class CreateExportCommand {
  constructor(public readonly createExport: CreateExportDto) { }
}

@CommandHandler(CreateExportCommand)
export class CreateExportCommandHandler
  implements ICommandHandler<CreateExportCommand>
{
  log = new Logger(CreateExportCommandHandler.name);
  constructor(
    private readonly ExportRepository: ExportRepository,
    private readonly productRepo: ProductRepository,
    private readonly exportDetailRepo: ExportDetailRepository,
    private readonly providerRepo: ProviderRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) { }
  async execute(command: CreateExportCommand): Promise<any> {
    this.log.debug('Create Export');
    const data = new InventoryExport();
    data.inventoryExportId = v4();
    data.userId = command.createExport.userId;
    data.createdDate = new Date();
    data.inventory = await this.inventoryRepository.findOne(
      command.createExport.inventoryId,
    );
    this.log.debug('data: ');
    console.log(JSON.stringify(data));
    // tạo export
    const result = await this.ExportRepository.create(data);
    let kq;
    for (const dto of command.createExport.products) {
      const exportDetail = new InventoryExportDetail();
      exportDetail.id = v4();
      exportDetail.inventoryExport = await this.ExportRepository.findOne(
        data.inventoryExportId,
      );
      const product = await this.productRepo.getProductId(dto.productId);
      this.log.log('\nproduct: ');
      console.log(JSON.stringify(product));

      exportDetail.product = product;

      exportDetail.provider = await this.providerRepo.findById(
        product.provider.id,
      );
      exportDetail.quantity = dto.quantity;
      exportDetail.unit = product.unit;
      kq = await this.exportDetailRepo.create(exportDetail);
    }
    return result;

    // return new ResponseBase(ResponseStatus.Failure, 'CREATED', result);
  }
}
