import { NextFunction, Request, Response } from 'express';
import HttpError from '../config/errors';

async function error(
  err: Error | HttpError | HttpError[],
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Promise<void> {
  let errors: HttpError[];

  if (process.env.NODE_ENV !== 'test') {
    console.error('REQUESTED_ENDPOINT', req.originalUrl, '\n', 'ERROR_HANDLED', err, '\n');
  }

  if (err instanceof Array) errors = err;
  else if (err instanceof HttpError) {
    errors = [err];
  } else {
    console.error(err, 'error without handler');
    errors = [new HttpError('InternalServer', 500)];
  }

  const firstError = errors[0];

  res.status(firstError.status).json({
    error: {
      errors,
      code: firstError.status,
      message: firstError.message,
    },
  });
}

export default error;
