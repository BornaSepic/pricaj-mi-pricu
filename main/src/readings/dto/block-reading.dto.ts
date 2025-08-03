import { IsDateString } from "class-validator";

export class BlockReadingDto {
  @IsDateString()
  date: string;
}