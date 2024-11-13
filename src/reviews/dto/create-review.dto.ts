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
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsNotEmpty()
  @IsInt()
  bootcampId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number; // Asegúrate de que este campo esté presente
}