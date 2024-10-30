import { Injectable } from '@nestjs/common';
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

  create(payload: any) {
    //Crear una instancia con el entity bootcamp y retornar
    const newReview = this.reviewRepository.create(payload)
    //Grabarlo
    return this.reviewRepository.save(newReview) ;
  }


  findAll() {
    return this.reviewRepository.find()
  }

  findOne(id: number) {
    return this.reviewRepository.findOneBy({id});
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return this.reviewRepository.delete({id});
  }
}
