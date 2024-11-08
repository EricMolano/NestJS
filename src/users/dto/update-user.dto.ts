import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';


export class UpdateUserDto {
  
    @IsString()
    @Length(1, 20)
    @IsOptional()
    name: string;
  
    @IsEmail()
    @Length(5, 100)
    @IsOptional()
    email: string;
  
    @IsString()
    @Length(1, 50)
    @IsOptional()
    role: string;
  
    @IsString()
    @Length(6, 255) 
    @IsOptional() 
    password: string;
  }
