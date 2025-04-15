import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, ValidateIf } from "class-validator";

export class FindAllByUserDto {
  @ApiProperty()
  @IsDateString()
  @ValidateIf((o) => o.from !== null)
  from: string | null;

  @ApiProperty()
  @IsDateString()
  @ValidateIf((o) => o.to !== null)
  to: string | null;
}