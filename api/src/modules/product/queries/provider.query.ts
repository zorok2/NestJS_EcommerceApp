/* eslint-disable prettier/prettier */
import { ProviderRepository } from './../repositories/provider.repository';
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Provider } from 'src/entities/product/provider.entity';

export class GetListProviderQuery implements IQuery {
  //constructor(public readonly page: number, public readonly pageSize: number) {}
}

@QueryHandler(GetListProviderQuery)
export class GetListProviderQueryHandler
  implements IQueryHandler<GetListProviderQuery>
{
  private readonly logger = new Logger(GetListProviderQueryHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(): Promise<any> {
    const result = this.providerRepository.findAll();
    return result;
  }
}

export class GetProviderByIdQuery {
  constructor(public readonly providerId: string) {}
}

@QueryHandler(GetProviderByIdQuery)
export class GetProviderByIdQueryHandler
  implements IQueryHandler<GetProviderByIdQuery>
{
  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(query: GetProviderByIdQuery): Promise<Provider> {
    return this.providerRepository.findById(query.providerId);
  }
}

export class GetProviderByNameQuery {
  constructor(
    public readonly providerName: string,
  ) // public readonly page: number,
  // public readonly pageSize: number,
  {}
}

@QueryHandler(GetProviderByNameQuery)
export class GetProviderByNameQueryHandler
  implements IQueryHandler<GetProviderByNameQuery>
{
  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(query: GetProviderByNameQuery): Promise<Provider[]> {
    return this.providerRepository.findByName(
      query.providerName,
      // query.page,
      // query.pageSize,
    );
  }
}
