import { getRootDir } from '@/src/common/lib/app-dir';
import * as FileStreamRotator from 'file-stream-rotator';
import pino from 'pino';
import pretty from 'pino-pretty';

export const createLogger = ({ name }: { name: string }) => {
  const rootDir = getRootDir();

  const streams = [
    {
      level: 'debug',
      stream: pretty({
        colorize: true,
        levelFirst: true,
      }),
    },
    {
      level: 'debug',
      stream: FileStreamRotator.getStream({
        filename: `${rootDir}/logs/debug-%DATE.log`,
        frequency: 'daily',
        date_format: 'DD-MM-DD',
        max_logs: '10',
      }),
    },
    {
      level: 'error',
      stream: FileStreamRotator.getStream({
        filename: `${rootDir}/logs/error-%DATE%.log`,
        frequency: 'daily',
        date_format: 'YYYY-MM-DD',
        max_logs: '10',
      }),
    },
  ];

  const logger = pino(
    {
      level: 'debug',
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },

        bindings: (bindings) => {
          return { hostname: bindings.hostname };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.multistream(streams)
  );
  return logger.child({ name: name });
};
