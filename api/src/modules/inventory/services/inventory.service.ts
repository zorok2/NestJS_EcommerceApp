import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ExcelService } from 'src/shared/file-upload/excell/excel.service';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { CreateReceiptFromFileCommand } from '../commands/create-reciept-from-file.command';
import {
  ExcellRequireColumns,
  ProductFromFileDto,
  ReceiptDto,
} from '../dto/request/create-reciept.dto';
import { GetListInventoryQuery } from '../queries/inventory.query';
import { CreateInventoryDto } from '../dto/request/create-inventory.dto';
import { CreateInventoryCommand } from '../commands/create-inventory.command';
import { MapProxy } from 'src/lib/proxy/map/map.proxy';
import { InventoryModel } from '../models/inventory.model';
import { DeleteInventoryCommand } from '../commands/delete-inventory.command';

@Injectable()
export class InventoryService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly excelService: ExcelService,
    private readonly googleMapProxy: MapProxy,
  ) { }
  private readonly logger = new Logger(InventoryService.name);

  async createReceipt(
    excellFile: Express.Multer.File,
    reciept: any,
  ): Promise<ResponseBase> {
    try {
      const productsFromFile = await this.excelService
        .getDataObject(excellFile, ExcellRequireColumns)
        .catch((error: Error) => {
          throw new BadRequestException(
            new ResponseBase(ResponseStatus.Failure, error.message),
          );
        });

      const productToExecute = productsFromFile.map(
        (data) => new ProductFromFileDto(data),
      );
      const recieptInformation = JSON.parse(reciept.receipt) as ReceiptDto;

      const commandResult = await this.commandBus.execute(
        new CreateReceiptFromFileCommand(productToExecute, recieptInformation),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Inserted',
        commandResult,
      );
    } catch (error) {
      throw new BadRequestException(
        new ResponseBase(ResponseStatus.Failure, error.message),
      );
    }
  }

  async getList(): Promise<ResponseBase> {
    try {
      const queryResult = await this.queryBus.execute(
        new GetListInventoryQuery(),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Get all inventory success',
        queryResult,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async createInventory(createInventoryDto: CreateInventoryDto) {
    try {
      const inventoryModel = new InventoryModel(createInventoryDto);
      const latitueAddress = await this.googleMapProxy.getLatitudeFromAddress(
        createInventoryDto.address,
      );
      inventoryModel.setLocation(latitueAddress);

      const commandResult = await this.commandBus.execute(
        new CreateInventoryCommand(inventoryModel),
      );

      return new ResponseBase(
        ResponseStatus.Success,
        'Inventory created',
        commandResult,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async removeInventory(id: string) {
    try {
      const commandResult = await this.commandBus.execute(
        new DeleteInventoryCommand(id),
      );

      return new ResponseBase(
        ResponseStatus.Success,
        'Delete success',
        commandResult,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
