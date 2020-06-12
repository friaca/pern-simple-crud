import { GenericError } from '../utils/error';
import { Request, Response, NextFunction } from 'express';

const handleErrors = (
  err: GenericError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof GenericError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default handleErrors;
