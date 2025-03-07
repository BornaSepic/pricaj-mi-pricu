import { Department } from "../../departments/entities/department.entity";
import { User } from "../../users/entities/user.entity";

export class CreateReadingDto {
  user?: User;
  department: Department;
  date: Date;
  blocked: boolean;
}
