import { Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const createDateFilter = <T>(key: string, from: Date | null, to: Date | null): FindOptionsWhere<T> => {
  if (!from && !to) {
    return {};
  }

  const filter = {}

  if (!from && to) {
    filter[key] = LessThanOrEqual(to)
    return filter
  }

  if (from && !to) {
    filter[key] = MoreThanOrEqual(from)
    return filter
  }

  filter[key] = Between(from, to)

  return filter
}