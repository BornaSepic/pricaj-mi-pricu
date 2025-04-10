export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null
}

export function isDefined<T>(t: T | undefined): t is T {
  return t !== undefined
}

export function isNotNull<T>(t: T | null): t is T {
  return t !== null
}

/**
 * Type guard for numbers. Answers false to NaN.
 */
export function isNumber<T>(t: number | T): t is number {
  return typeof t === 'number' && !Number.isNaN(t)
}

/**
 * Check if object has a key
 */
export const hasKey = function <K extends string>(
  key: K,
  x: unknown
): x is { [k in K]: unknown } {
  return typeof x === 'object' && x !== null && key in x
}

export const isArray = function <T, U>(term: Array<T> | U): term is Array<T> {
  return Array.isArray(term)
}
