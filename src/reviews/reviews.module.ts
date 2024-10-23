import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],  // Import the Reviews entity from the TypeORM module
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
