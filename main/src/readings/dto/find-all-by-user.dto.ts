import { IsDateString, IsNumberString, IsString, ValidateIf } from "class-validator";

export class FindAllByUserDto {
  @IsNumberString()
  id: string;
}

export class FindAllByUserQueryDto {
  @IsDateString()
  @ValidateIf((o) => o.from !== null)
  from: string | null;

  @IsDateString()
  @ValidateIf((o) => o.to !== null)
  to: string | null;
}