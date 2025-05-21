import { NextFunction, Request, Response } from 'express';

export const unknownRoutesMiddleware = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(404).json({ message: `This page does not exist.` });
};
