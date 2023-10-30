/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderDto } from '../dto/update-order-status.dto';
import { OrderRepository } from '../repositories/order.repository';

export class UpdateOrderStatusCommand {
  constructor(public readonly id: string, public readonly status: string) {}
}

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusCommandHandler
  implements ICommandHandler<UpdateOrderStatusCommand>
{
  constructor(private readonly orderRepo: OrderRepository) {}
  async execute(command: UpdateOrderStatusCommand): Promise<any> {
    const orderSave = await this.orderRepo.findById(command.id);
    orderSave.status = command.status;
    return this.orderRepo.update(orderSave);
  }
}
