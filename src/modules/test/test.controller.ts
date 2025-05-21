import { NextFunction, Request, Response } from 'express';

const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.path);

    res.status(200).json({
      success: true,
      test: 'passed',
    });
  } catch (err) {
    next(err);
  }
};

export const testController = {
  test,
};
