import { IsEnum, IsNumberString } from "class-validator";

export class GetReadingByDepartmentDto {
  @IsNumberString()
  departmentId: string;

  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}