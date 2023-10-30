/* eslint-disable prettier/prettier */
import {
  Controller,
  Logger,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { UserGuard } from 'src/lib/guard/auth.guard';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/request/create-review.dto';

@ApiTags('Review Endpoint')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  private readonly logger = new Logger(ReviewController.name);

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }
}
