import { testRouter } from '@/src/modules/test/test.router';
import { Router } from 'express';

export const apiRouter = Router();

apiRouter.use(testRouter);
