import { requestBodyTrimMiddleware } from '@/src/common/middewares/request-body-trim.middleware';

global.appRoot = path.resolve(__dirname);

import path from 'node:path';
import { setupSwagger } from '@/src/common/lib/swagger';
import { exceptionsMiddleware } from '@/src/common/middewares/exceptions.middleware';
import { unknownRoutesMiddleware } from '@/src/common/middewares/unknown-routes.middleware';
import { globalThrottler } from '@/src/common/throttlers/global.throttler';
import { apiRouter } from '@/src/routes';
import express from 'express';

const app = express();

const PORT = process.env.PORT || 8080;

async function main() {
  app.disable('x-powered-by');

  app.set('trust-proxy', 1);

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(requestBodyTrimMiddleware);

  app.use(express.urlencoded({ extended: true }));

  setupSwagger({ app });

  //  -- Routes --
  app.use('/api', globalThrottler, apiRouter);

  app.use(unknownRoutesMiddleware);

  app.use(exceptionsMiddleware);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
  });
}

main();

export { app };
