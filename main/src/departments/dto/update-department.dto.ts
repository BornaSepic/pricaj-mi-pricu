import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';
import { IsNumber } from 'class-validator';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
}
