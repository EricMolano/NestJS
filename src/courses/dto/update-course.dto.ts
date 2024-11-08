import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsNumber, IsDateString, MaxLength } from 'class-validator';
import { minimumSkill } from '../entities/course.entity'; 

export class UpdateCourseDto {
  @IsOptional() // Hacemos que este campo sea opcional
  @IsString()
  title?: string;

  @IsOptional() // Hacemos que este campo sea opcional
  @IsString()
  description?: string;

  @IsOptional() // Hacemos que este campo sea opcional
  weeks?: number;

  @IsOptional() // Hacemos que este campo sea opcional
  @IsNumber()
  tuition?: number;

  @IsOptional() // Hacemos que este campo sea opcional
  @IsEnum(minimumSkill)
  minimum?: minimumSkill;

  @IsOptional() // Hacemos que este campo sea opcional
  @IsDateString()
  createdAt?: string; // Este campo normalmente no debería actualizarse, pero si es necesario, lo agregamos como opcional
}
