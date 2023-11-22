/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
  
}
