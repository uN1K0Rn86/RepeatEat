import { get, type FieldErrors, type FieldError } from 'react-hook-form'

export const getFieldError = (
  errors: FieldErrors,
  path: string,
): FieldError | undefined => {
  return get(errors, path) as FieldError | undefined
}
