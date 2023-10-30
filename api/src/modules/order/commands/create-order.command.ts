/* eslint-disable prettier/prettier */
import { ProductInventoryDto } from './../dto/order-by-inventory.dto';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from 'src/entities/product/order.entity';
import { v4 } from 'uuid';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { PaymentMethodRepository } from 'src/modules/payment/repository/payment-method.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { Logger } from '@nestjs/common';
import { OrderDetail } from 'src/entities/product/order-detail.entity';
import { CreateExportEvent } from '../events/create-export.event';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { OrderDetailRepository } from '../repositories/order-detail.repository';
import { OrderRepository } from '../repositories/order.repository';
import { UpdateProductCommand } from 'src/modules/product/commands/update-product.command';
import {
  AddProductRequest,
  RemoveProductFromCartDto,
} from 'src/modules/cart/dto/add-product.dto';
import { RemoveProductFromCartCommand } from 'src/modules/cart/commands/remove-product-from-cart.command';
import { UpdateOrderStatusCommand } from './update-order-status.command';
import { MapProxy } from 'src/lib/proxy/map/map.proxy';
import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';
import { InventoryRepository } from 'src/modules/inventory/repositories/inventory.repository';
import { InventoryDetailRepository } from 'src/modules/inventory/repositories/inventory-detai.repository';
import { DistanceDto } from 'src/modules/inventory/dto/request/distance-inventory.dto';
import { CreateExportDto } from 'src/modules/inventory/dto/request/create-export.dto';
import { CreateDetailExportDto } from 'src/modules/inventory/dto/request/create-Detail-Export.dto';

export class CreateOrderCommand {
  constructor(public readonly createOrderCommand: CreateOrderDto) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  private readonly logger = new Logger(CreateOrderCommandHandler.name);

  constructor(
    private readonly eventbus: EventBus,
    private readonly orderRepo: OrderRepository,
    private readonly orderDetailRepo: OrderDetailRepository,
    private readonly productRepo: ProductRepository,
    private readonly paymentRepo: PaymentMethodRepository,
    private readonly userRepo: UserRepository,
    private readonly commandBus: CommandBus,
    private readonly mapProxy: MapProxy,
    private readonly inventoryRepo: InventoryRepository,
    private readonly inventoryDetailRepo: InventoryDetailRepository,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
    this.logger.debug('Create order');
    const order = new Order();
    order.id = v4();
    order.order_date = new Date();
    order.delivery_date = new Date();
    order.status = 'Chua thanh toan';
    order.discount = 0;
    let sum = 0;
    for (const p of command.createOrderCommand.products) {
      const product = await this.productRepo.getProductId(p.productId);
      this.logger.debug('product price: ' + product.price);
      sum = sum + product.price * p.quantity;
      this.logger.debug('sum: ' + sum);
    }
    this.logger.debug('PRICE SUM: ' + sum);
    order.totalPrice = sum;

    order.paymentMethod = await this.paymentRepo.findOneById(
      command.createOrderCommand.paymentMethodId,
    );

    order.user = await this.userRepo.findById(
      command.createOrderCommand.userId,
    );
    // tạo order
    const result = await this.orderRepo.create(order);
    const inventories = await this.inventoryRepo.findAll();
    const distanceList = new Array<DistanceDto>();
    let distance;
    let inventory;
    for (let index = 0; index < inventories.length; index++) {
      const element = inventories[index].location;
      const check = this.mapProxy.getDistance(
        command.createOrderCommand.location,
        element,
      );
      const temp = new DistanceDto();
      temp.inventoryId = inventories[index].id;
      temp.distance = await check;
      if (check < distance) {
        distance = check.catch;
        inventory = inventories[index];
      }
      distanceList.push(temp);
    }
    distanceList.sort((a, b) => a.distance - b.distance);
    //distanceList[0] kho gần khách nhất
    //List sản phẩm xuất từ kho gần nhất
    const listProductInventoryDto = new Array<ProductInventoryDto>();
    for (const inventory of inventories) {
      const temp = new ProductInventoryDto();
      temp.inventoryId = inventory.id;
      listProductInventoryDto.push(temp);
    }
    this.logger.debug(listProductInventoryDto.length);
    this.logger.debug(listProductInventoryDto[0]);
    let tempProduct = new Array<CreateDetailExportDto>();
    tempProduct = command.createOrderCommand.products;
    for (const product of tempProduct) {
      this.logger.debug(tempProduct);
      for (const inventory of inventories) {
        if (
          await this.inventoryDetailRepo.findByIdProductAndInventoryId(
            product.productId,
            inventory.id,
          )
        ) {
          this.logger.debug(inventory.inventoryName);
          for (let index = 0; index < listProductInventoryDto.length; index++) {
            if (inventory.id == listProductInventoryDto[index].inventoryId) {
              listProductInventoryDto[index].products =
                new Array<CreateDetailExportDto>();
              listProductInventoryDto[index].products.push(product);
              for (let i = 0; i < tempProduct.length; i++) {
                if (tempProduct[i].productId == product.productId) {
                  //tempProduct.splice(i,1);
                }
              }
            }
          }
        } else break;
      }
    }

    //tạo chi tiết phiếu xuất -> count list = 0 xóa list

    //tạo order detail
    for (const product of command.createOrderCommand.products) {
      const orderDetail = new OrderDetail();
      orderDetail.id = v4();
      orderDetail.order = await this.orderRepo.findById(order.id);
      orderDetail.product = await this.productRepo.getProductId(
        product.productId,
      );
      orderDetail.quantity = product.quantity;
      orderDetail.pricePurchase = orderDetail.product.price;
      await this.orderDetailRepo.create(orderDetail);
    }

    //tạo phiếu xuất & chi tieets phieu xuat
    // this.exportService.createExport(command.createOrderCommand.exportDto);

    //update quantity of product in inventory Detail
    for (let index = 0; index < listProductInventoryDto.length; index++) {
      //create export
      const exportDto = new CreateExportDto();
      exportDto.createdDate = new Date();
      exportDto.inventoryId = listProductInventoryDto[index].inventoryId;
      exportDto.userId = command.createOrderCommand.userId;
      exportDto.products = listProductInventoryDto[index].products;
      this.logger.debug('CREATE EXPORT AND DETAIL:');
      this.eventbus.publish(new CreateExportEvent(exportDto));
      this.logger.debug('CREATE UPDATE SAN PHAM:');
      const errors: string[] = [];
      for (const product of listProductInventoryDto[index].products) {
        const data = await this.productRepo.getProductId(product.productId);
        data.quantityStock = product.quantity;
        this.logger.debug(
          'QUANTITY STOCK sau khi gọi update:' + data.quantityStock,
        );

        const productsave = await this.commandBus.execute(
          new UpdateProductCommand(data),
        );
        if (productsave.status === 'Failure') {
          errors.push(`The product ${product.productId} out of stock`);
        }
        //update quantity in inventory detail
        const inventoryDetail =
          await this.inventoryDetailRepo.findByIdProductAndInventoryId(
            product.productId,
            listProductInventoryDto[index].inventoryId,
          );
        inventoryDetail.quantity -= product.quantity;
        await this.inventoryDetailRepo.update(
          inventoryDetail.id,
          inventoryDetail,
        );
        //create export detail for each product
        const exportDetail = new InventoryExportDetail();
        exportDetail.id = v4();
        exportDetail.product = product[index];
        //exportDetail.inventoryExport =
      }
      if (errors.length > 0) {
        return new ResponseBase(ResponseStatus.Failure, errors.join(', '));
      }
    }

    //create export detail

    // trừ giỏ hàng
    const dto = new RemoveProductFromCartDto();
    dto.products = [];
    for (const product of command.createOrderCommand.products) {
      const productRequest = new AddProductRequest();
      productRequest.productId = product.productId;
      productRequest.quantity = product.quantity;
      dto.products.push(productRequest);
    }
    this.logger.debug('DTO: ' + JSON.stringify(dto));

    try {
      const cart = await this.commandBus.execute(
        new RemoveProductFromCartCommand(
          command.createOrderCommand.userId,
          dto,
        ),
      );
      this.logger.debug('CART DATA: ' + JSON.stringify(cart));
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
    this.commandBus.execute(
      new UpdateOrderStatusCommand(order.id, 'Đã thanh toán'),
    );

    return result;
  }
}
