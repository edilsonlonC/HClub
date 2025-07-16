import { Application } from 'express';
import { Server } from 'http';
import { initApp } from './app';
import { createLogger } from '../logger';
import { initDb } from '../database/principal-db';

const port = process.env.PORT || 3000;

let server: Server;

export const httpServer = async () => {
  const logger = createLogger();
  const app: Application = await initApp();
  server = app.listen(port, async () => {
    await initDb();
    logger.info(`Server is running on port ${port}`);
  });

  process.on('uncaughtException', (e: unknown) => {
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
