import { setupSwagger } from '@/src/common/lib/swagger';
import { exceptionsMiddleware } from '@/src/common/middewares/exceptions.middleware';
import { requestBodyTrimMiddleware } from '@/src/common/middewares/request-body-trim.middleware';
import { unknownRoutesMiddleware } from '@/src/common/middewares/unknown-routes.middleware';
import { globalThrottler } from '@/src/common/throttlers/global.throttler';
import { apiRouter } from '@/src/routes';
import express, { Application } from 'express';

export async function createApp(): Promise<Application> {
  const app = express();

  /* Disable the 'X-Powered-By' header to avoid exposing Express in HTTP responses */
  app.disable('x-powered-by');

  /* Trust the first proxy (e.g., Cloudflare) to use the correct client IP from the 'X-Forwarded-For' header -- */
  app.set('trust proxy', 1);

  /* -- Parse the body of the request */
  app.use(express.json());

  /* -- Parse URL-encoded bodies (as sent by HTML forms) -- */
  app.use(express.urlencoded({ extended: true }));

  /* -- Trim the incoming request body; remove any leading/trailing whitespace --  */
  app.use(requestBodyTrimMiddleware);

  /* -- Initialize Swagger API documentation -- */
  setupSwagger({ app });

  /* -- Register API router and apply global rate limiting -- */
  app.use('/api', globalThrottler, apiRouter);

  /* -- Handle request to unknown routes (404 Not Found) -- */
  app.use(unknownRoutesMiddleware);

  /* -- Handle errors and send standardized error responses -- */
  app.use(exceptionsMiddleware);

  return app;
}


