import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateReadingsReportDto {
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsDateString()
  from?: string;


  @IsOptional()
  @IsDateString()
  to?: string;
}