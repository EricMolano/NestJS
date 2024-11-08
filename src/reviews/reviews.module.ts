import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Bootcamp])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}