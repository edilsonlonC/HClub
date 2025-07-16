import { DataSource } from 'typeorm';
import AppDataSource from './data-source';
import { createLogger } from '../../logger';

let db: DataSource;
export const initDb = async (): Promise<DataSource> => {
  const logger = createLogger();
  if (db) return db;
  db = AppDataSource;
  logger.info('initializing database');
  return db.initialize();
};
