import App from '@/app';
import logger from '@utils/logger';

process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.debug(err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  logger.error('UNHANDLED REJECTION!');
  logger.debug(err);
});

const bootstrap = async () => {
  const app = new App();

  await app.initializeApp();

  app.listen();
};

bootstrap();
