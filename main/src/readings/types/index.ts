import { Department } from "../../departments/entities/department.entity";
import { User } from "../../users/entities/user.entity";

export type CreateReadingPayload = {
  user?: User;
  department: Department;
  date: Date;
  blocked: boolean;
}