import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review) private reviewRepository: Repository <Review>,
  ) {}

  async create(payload: CreateReviewDto) {
    const newReview = this.reviewRepository.create(payload);
    return this.reviewRepository.save(newReview);
  }



  async findAll() {
    return this.reviewRepository.find()
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }


  async update(id: number, payload: UpdateReviewDto) {
    const updReview = await this.reviewRepository.findOneBy({ id });
    if (!updReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    this.reviewRepository.merge(updReview, payload);
    return this.reviewRepository.save(updReview);
  }

  async remove(id: number) {
    const resultreview = await this.reviewRepository.delete({ id });
    if (resultreview.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return { message: 'Review borrado exitosamente' };
  }
}
