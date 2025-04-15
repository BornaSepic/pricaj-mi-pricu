import { Between, FindOperator, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const createDateFilter = <T>(from: Date | null, to: Date | null): FindOperator<Date> | undefined => {
  if (!from && to) {
    return LessThanOrEqual(to)
  }

  if (from && !to) {
    return MoreThanOrEqual(from)
  }

  if (from && to) {
    return Between(from, to)
  }
}