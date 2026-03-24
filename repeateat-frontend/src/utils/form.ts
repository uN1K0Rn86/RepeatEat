import { get, type FieldErrors, type FieldError } from 'react-hook-form'

export const getFieldError = (
  errors: FieldErrors,
  path: string,
): FieldError | undefined => {
  return get(errors, path) as FieldError | undefined
}

export const toDate = (value: unknown): Date | undefined => {
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? undefined : d
  }
  return undefined
}
