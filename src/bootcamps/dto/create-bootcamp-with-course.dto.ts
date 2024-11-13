import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsNumber, IsDateString, MaxLength } from 'class-validator';
import { minimumSkill } from '../../courses/entities/course.entity';

export class CreateBootcampWithCourseDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  topics: string;

  @IsNotEmpty()
  averageRating: number;

  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  courseTitle: string;

  @IsString()
  @IsNotEmpty()
  courseDescription: string;

  @IsNotEmpty()
  courseWeeks: number;

  @IsNumber()
  courseTuition?: number;

  @IsEnum(minimumSkill)
  courseMinimum: minimumSkill;

  @IsDateString()
  courseCreatedAt: string;
}