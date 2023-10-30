// /* eslint-disable prettier/prettier */
// import { Logger } from '@nestjs/common';
// import { UserRepository } from '../repositories/user.repository';
// import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// /* eslint-disable prettier/prettier */
// export class GetUserByIdQuery implements IQuery {
//   constructor(public readonly userId: string) {}
// }

// @QueryHandler(GetUserByIdQuery)
// export class GetUserByIdQueryHandler
//   implements IQueryHandler<GetUserByIdQuery>
// {
//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(query: GetUserByIdQuery): Promise<any> {
//     return this.userRepository.findById(query.userId);
//   }
// }

// export class GetListUserQuery implements IQuery {}

// @QueryHandler(GetListUserQuery)
// export class GetListUserQueryHandler
//   implements IQueryHandler<GetListUserQuery>
// {
//   private readonly logger = new Logger(GetListUserQueryHandler.name);

//   constructor(private readonly userRepository: UserRepository) {}

//   async execute(): Promise<any> {
//     this.logger.log('user list log');
//     const result = await this.userRepository.findAll();
//     return result;
//   }
// }
