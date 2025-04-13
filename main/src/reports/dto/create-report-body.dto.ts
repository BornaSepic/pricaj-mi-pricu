import { IsNumber, IsString } from 'class-validator';

export class CreateReportBodyDto {
  @IsString()
  title: string;
  
  @IsString()
  description: string;

  @IsNumber()
  readingId: number;
}
