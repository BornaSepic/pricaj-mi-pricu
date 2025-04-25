import { IsNumberString } from "class-validator";

export class SignUpForEventDto {
  @IsNumberString()
  id: number;
}
