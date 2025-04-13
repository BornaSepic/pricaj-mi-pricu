import { IsNumberString } from "class-validator";

export class GetReadingByDepartmentDto {
  @IsNumberString()
  id: string;
}