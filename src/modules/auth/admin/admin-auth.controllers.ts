import type { NextFunction, Request, Response } from 'express';
import { validate } from '@/src/common/lib/validator';
import { adminAuthSigInSchema } from '@/src/modules/auth/admin/schemas/signin.schemas';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate({ req, schema: adminAuthSigInSchema });

    const admin = body.email;
    console.log(admin);

    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

export const adminController = {
  signIn,
};
