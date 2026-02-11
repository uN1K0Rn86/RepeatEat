import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error: ', err)

  const statusCode = err.statusCode || err.status || 500
  const message = err.message || 'Internal server error'

  res.status(statusCode).json({
    error: message,
  })
  next(err)
}
