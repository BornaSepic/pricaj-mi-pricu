import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString } from "class-validator";

export class GetReadingByDepartmentDto {
  @ApiProperty({
    required: true,
  })
  @IsNumberString()
  departmentId: string;

  @ApiProperty({
    required: false,
    default: 'active',
  })
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}