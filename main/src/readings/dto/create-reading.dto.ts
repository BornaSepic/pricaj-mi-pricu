import { Optional } from "@nestjs/common";
import { IsDateString, IsNumber } from "class-validator";

export class CreateReadingDto {
  @Optional()
  @IsNumber()
  userId: number;

  @IsNumber()
  departmentId: number;

  @IsDateString()
  date: string;
}