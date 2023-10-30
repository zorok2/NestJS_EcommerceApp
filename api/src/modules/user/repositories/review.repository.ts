import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Review } from 'src/entities/user/review.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { Product } from 'src/entities/product/product.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly productRepo: ProductRepository,
  ) {}

  async findAll() {
    return this.reviewRepository.find({ relations: ['product'] });
  }

  async findById(userId: string) {
    return this.reviewRepository.findOneBy({
      user: {
        id: userId,
      },
    });
  }

  async calculateProductRating(productId) {
    const reviews = await this.reviewRepository.find({
      relations: ['product'],
      where: {
        product: {
          productId: productId,
        },
      },
    });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    Logger.debug('total rating' + totalRating);
    const averageRating = totalRating / reviews.length;
    const product = reviews[0].product;
    product.rating = Math.round(averageRating);
    const rs = await this.productRepo.createProduct(product);
    Logger.debug('succress' + product.rating);
  }

  async createReview(review) {
    return this.reviewRepository.save(review);
  }
}
