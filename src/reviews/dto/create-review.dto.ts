import { IsNotEmpty, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  comment: string;

  @IsNotEmpty()
  rating: number;
}
