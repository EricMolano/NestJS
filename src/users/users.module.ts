import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Bootcamp } from '../bootcamps/entities/bootcamp.entity';
import { Review } from '../reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bootcamp, Review])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}