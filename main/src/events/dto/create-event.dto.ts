import { Optional } from "@nestjs/common";
import { IsDateString, IsString, Validate } from "class-validator";
import { IsNumberOrString } from "../../helpers/validators/string-number";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @Optional()
  @Validate(IsNumberOrString)
  limit: string | number;
}
