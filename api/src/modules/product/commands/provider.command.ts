/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProviderDto } from '../dto/request/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderRepository } from '../repositories/provider.repository';
import { Provider } from 'src/entities/product/provider.entity';
import { v4 as uuidv4, v4 } from 'uuid';

/* eslint-disable prettier/prettier */
export class CreateProviderCommand {
  constructor(public readonly provider: CreateProviderDto) {}
}

@CommandHandler(CreateProviderCommand)
export class CreateProviderCommandHandler
  implements ICommandHandler<CreateProviderCommand>
{
  private readonly logger = new Logger(CreateProviderCommandHandler.name);

  constructor(
    //@InjectRepository(Provider)
    private readonly providerRepository: ProviderRepository,
  ) {}

  async execute(command: CreateProviderCommand): Promise<Provider> {
    this.logger.debug(`Create Provider Handler`);
    const provider = new Provider();
    provider.id = v4();
    provider.name = command.provider.providerName;
    return this.providerRepository.create(provider);
  }
}

export class UpdateProviderCommand {
  constructor(public readonly provider: Provider) {}
}

@CommandHandler(UpdateProviderCommand)
export class UpdateProviderCommandHandler
  implements ICommandHandler<UpdateProviderCommand>
{
  private readonly logger = new Logger(UpdateProviderCommandHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(command: UpdateProviderCommand) {
    this.logger.debug(`Update Product Command Handler`);
    return this.providerRepository.update(command.provider);
  }
}
