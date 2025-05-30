import { adminAuthRouter } from '@/src/modules/auth/admin/admin-auth.routes';
import { testRouter } from '@/src/modules/test/test.router';
import { Router } from 'express';

export const apiRouter = Router();

/* -- Auth --  */
apiRouter.use(adminAuthRouter);
apiRouter.use(testRouter);
