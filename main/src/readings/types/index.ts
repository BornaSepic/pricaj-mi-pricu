import { Department } from "../../departments/entities/department.entity";
import { User } from "../../users/entities/user.entity";
import { Reading } from "../entities/reading.entity";

export type CreateReadingPayload = {
  user?: User;
  department: Department;
  date: Date;
  blocked: boolean;
}

export type ActiveReading = {
  date: Date;
  readings: Reading[];
}

export type ReadingsByDate = {
  date: Date;
  readings: Reading[];
}