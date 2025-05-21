import { strictThrottler } from '@/src/common/throttlers/strict.throttler';
import { testController } from '@/src/modules/test/test.controller';
import { Router } from 'express';

export const testRouter = Router();

testRouter.get('/test', strictThrottler, testController.test);
