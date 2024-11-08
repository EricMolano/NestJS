import { IsOptional, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  comment?: string;

  @IsOptional()
  rating?: number;
}
