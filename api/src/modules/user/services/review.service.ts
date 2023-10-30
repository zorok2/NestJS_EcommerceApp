import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReviewCommand } from '../commands/create_review.command';
import { CreateReviewDto } from '../dto/request/create-review.dto';
import { GetAllReviewQuery } from '../queries/get-all-review.query';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import e from 'express';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { OrderDetailRepository } from 'src/modules/order/repositories/order-detail.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly productRepo: ProductRepository,
    private readonly reviewRepo: ReviewRepository,
    private readonly orderDetailRepository: OrderDetailRepository,
  ) {}
  private readonly logger = new Logger(ReviewService.name);

  async createReview(dto: CreateReviewDto) {
    try {
      this.logger.debug('Create review');
      const rs = await this.commandBus.execute(new CreateReviewCommand(dto));
      this.reviewRepo.calculateProductRating(dto.productId);
      const od = await this.orderDetailRepository.findBothOrderProduct(
        dto.orderId,
        dto.productId,
      );
      od[0].isReviewed = true;
      this.orderDetailRepository.create(od[0]);
      this.logger.debug('LOG order detai hehe  ' + od.length);

      return new ResponseBase(ResponseStatus.Success, 'Create success', rs);
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getAll() {
    try {
      const rs = await this.queryBus.execute(new GetAllReviewQuery());
      return new ResponseBase(ResponseStatus.Success, 'Get all success', rs);
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
