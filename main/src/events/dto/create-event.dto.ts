import { Optional } from "@nestjs/common";
import { IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @Optional()
  @IsString()
  limit: string;
}
