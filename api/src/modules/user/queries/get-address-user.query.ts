import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from 'src/entities/user/user.entity';

export class GetAddressUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetAddressUserQuery)
export class GetAddressUserQueryHandler
  implements IQueryHandler<GetAddressUserQuery>
{
    constructor(private readonly addressRepository: AddressRepository){}
  execute(query: GetAddressUserQuery): Promise<Address[]> {
    return this.addressRepository.findAdressByUserId(query.userId);
  }
}
