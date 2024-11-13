import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Bootcamp) private bootcampRepository: Repository<Bootcamp>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: CreateReviewDto) {
    const bootcamp = await this.bootcampRepository.findOneBy({ id: payload.bootcampId });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${payload.bootcampId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: payload.userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${payload.userId} not found`);
    }

    const newReview = this.reviewRepository.create({ ...payload, bootcamp, user });
    await this.reviewRepository.save(newReview);
    await this.updateBootcampRating(bootcamp.id);
    return newReview;
  }

  async findAll() {
    return this.reviewRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['user'] });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, payload: UpdateReviewDto) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    this.reviewRepository.merge(review, payload);
    await this.reviewRepository.save(review);
    await this.updateBootcampRating(review.bootcamp.id);
    return review;
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    await this.reviewRepository.delete({ id });
    await this.updateBootcampRating(review.bootcamp.id);
    return { message: 'Review borrado exitosamente' };
  }

  private async updateBootcampRating(bootcampId: number) {
    const bootcamp = await this.bootcampRepository.findOne({ where: { id: bootcampId }, relations: ['reviews'] });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp with ID ${bootcampId} not found`);
    }
    const totalReviews = bootcamp.reviews.length;
    if (totalReviews > 0) {
      const averageRating = bootcamp.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
      bootcamp.averageRating = averageRating;
    } else {
      bootcamp.averageRating = 0; // Si no hay reviews, el averageRating debe ser 0
    }
    await this.bootcampRepository.save(bootcamp);
  }
}