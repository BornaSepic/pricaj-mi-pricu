import { IsDateString, IsNumber } from "class-validator";

export class CreateReadingDto {
  @IsNumber()
  departmentId: number;

  @IsNumber()
  userId: number;

  @IsDateString()
  date: string;
}