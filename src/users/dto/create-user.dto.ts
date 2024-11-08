import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @Length(1, 20)
  name: string;

  @IsEmail()
  @Length(5, 100)
  email: string;

  @IsString()
  @Length(1, 50)
  role: string;

  @IsString()
  @Length(6, 255)  
  password: string;
}
