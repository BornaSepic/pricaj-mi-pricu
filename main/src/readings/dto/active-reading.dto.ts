import { Reading } from "../entities/reading.entity";

export class ActiveReadingDto {
  date: Date;
  readings: Reading[];
}