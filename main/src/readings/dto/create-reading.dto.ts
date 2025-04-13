import { IsDateString, IsNumber } from "class-validator";

export class CreateReadingDto {
  @IsNumber()
  departmentId: number;

  @IsDateString()
  date: string;
}