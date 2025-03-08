import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportBodyDto {
  title: string;
  
  description: string;

  @IsNumber()
  readingId: number;

  @IsNumber()
  userId: number;
}
