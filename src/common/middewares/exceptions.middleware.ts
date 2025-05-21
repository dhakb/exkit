import { createLogger } from '@/src/common/lib/logger';
import { NextFunction, Request, Response } from 'express';
import httpError from 'http-errors';

const logger = createLogger({ name: 'exceptions-middleware' });

export const exceptionsMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(err);

  if (httpError.isHttpError(err)) {
    return res.status(err.status).json(err);
  }

  logger.fatal({
    url: req.protocol + '://' + req.hostname + req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  return res.status(500).json({ message: 'Oops.. Internal Server Error' });
};
