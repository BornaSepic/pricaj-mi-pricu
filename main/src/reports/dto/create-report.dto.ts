import { Reading } from "../../readings/entities/reading.entity";

export class CreateReportDto {
  title: string;
  description: string;
  reading: Reading;
}
