import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBootcampDto } from './create-bootcamp.dto';

export class UpdateBootcampDto extends PartialType(CreateBootcampDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  topics?: string;

  @IsOptional()
  @IsNotEmpty()
  averageRating?: number;

  @IsOptional()
  @IsNotEmpty()
  createdAt?: Date;
}
