/* eslint-disable prettier/prettier */
import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { Category } from '../../../entities/product/category.entity';
import { UserRepository } from '../repositories/user.repository';
import { ReviewRepository } from '../repositories/review.repository';

export class GetAllReviewQuery implements IQuery {
  constructor() {}
}

@QueryHandler(GetAllReviewQuery)
export class GetAllReviewQueryHandler
  implements IQueryHandler<GetAllReviewQuery>
{
  constructor(private readonly repo: ReviewRepository) {}

  async execute(query: GetAllReviewQuery): Promise<any> {
    return this.repo.findAll();
  }
}
