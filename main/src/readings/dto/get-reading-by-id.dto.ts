import { IsNumber, IsNumberString } from "class-validator";

export class GetReadingByIdDto {
  @IsNumberString()
  id: string;
}