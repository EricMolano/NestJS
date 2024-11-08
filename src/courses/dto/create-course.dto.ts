import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum, IsNumber, IsDateString, MaxLength } from 'class-validator';
import { minimumSkill } from '../entities/course.entity';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  weeks: number;

  @IsNumber()
  tuition?: number;

  @IsEnum(minimumSkill)
  minimum: minimumSkill;

  @IsDateString()
  createdAt: string;
}
