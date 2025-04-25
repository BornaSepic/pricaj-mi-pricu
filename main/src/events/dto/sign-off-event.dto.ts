import { IsNumberString } from "class-validator";

export class SignOffEventDto {
  @IsNumberString()
  id: number;
}
