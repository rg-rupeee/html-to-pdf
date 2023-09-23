import winston from 'winston';

import Config from '@/config/environment';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: { timestamp: any; level: any; message: any }) =>
      `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: Config.envVars.LOG_LEVEL,
  levels,
  format,
  transports,
});

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export default logger;
