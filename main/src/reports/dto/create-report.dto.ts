import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;
  
  @IsString()
  description: string;

  @IsNumber()
  readingId: number;
}
