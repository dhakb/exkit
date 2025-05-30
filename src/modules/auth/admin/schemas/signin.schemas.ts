import { z } from 'zod';

export const adminAuthSigInSchema = {
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
};
