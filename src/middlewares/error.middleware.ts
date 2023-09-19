import { Request, Response } from 'express';

import AppError from '@utils/error';
import logger from '@utils/logger';

const errorMiddleware = (err: AppError, req: Request, res: Response) => {
  logger.debug(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${err.status}, Message:: ${err.message}`);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong!',
  });
};

export default errorMiddleware;
