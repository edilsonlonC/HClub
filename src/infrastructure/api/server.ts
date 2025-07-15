import { Application } from 'express';
import { Server } from 'http';
import { initApp } from './app';
import { createLogger } from '../logger';

const port = process.env.PORT || 3000;

let server: Server;

export const httpServer = () => {
  const logger = createLogger();
  const app: Application = initApp();
  server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  process.on('uncaughtException', (e: unknown) => {
    console.log('Uncaught Exception', e);
    logger.error(e);
    if (server) {
      server.close(() => {
        logger.error('server was closed');
        return;
      });
      logger.info('Server closed');
    }
  });
};
