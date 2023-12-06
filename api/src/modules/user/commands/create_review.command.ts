import { ReviewRepository } from './../repositories/review.repository';
import {
  CommandHandler,
  ICommand,
  ICommandHandler,
  IQuery,
} from '@nestjs/cqrs';
import { CreateReviewDto } from '../dto/request/create-review.dto';
import { Review } from 'src/entities/user/review.entity';
import { UserRepository } from '../repositories/user.repository';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { OrderDetailRepository } from 'src/modules/order/repositories/order-detail.repository';

export class CreateReviewCommand implements ICommand {
  constructor(public readonly createReviewDto: CreateReviewDto) {}
}

@CommandHandler(CreateReviewCommand)
export class CreateReviewCommandHandler
  implements ICommandHandler<CreateReviewCommand>
{
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  
  async execute(command: CreateReviewCommand): Promise<any> {
    const review = new Review();
    review.comment = command.createReviewDto.comment;
    review.rating = command.createReviewDto.rating;
    const user = await this.userRepository.findById(
      command.createReviewDto.userId,
    );
    const product = await this.productRepository.getProductId(
      command.createReviewDto.productId,
    );
    review.user = user;
    review.product = product;
    return this.reviewRepo.createReview(review);
  }
}
